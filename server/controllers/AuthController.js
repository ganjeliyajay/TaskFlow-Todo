import { compare, hash } from "bcrypt"
import { $User } from "../model/Users.js"
import { transporter } from "../config/transporter.js"
import jwt from 'jsonwebtoken'


export const userRegister = async (req, res) => {
  try {
    const { name, email, password, conpass } = req.body;
    console.log(req.body);

    if (!name) return res.status(400).json({ msg: "Please enter your name" });
    if (!email) return res.status(400).json({ msg: "Please enter your email" });
    if (!password) return res.status(400).json({ msg: "Please enter your password" });
    if (!conpass) return res.status(400).json({ msg: "Please confirm your password" });
    if (password !== conpass)
      return res.status(400).json({ msg: "Passwords do not match" });

    const findEmail = await $User.findOne({ email });
    if (findEmail)
      return res.status(409).json({ msg: "User already registered" }); // conflict

    const pass = await hash(password, 10);
    const conPass = await hash(conpass, 10);

    const mailOptions = {
      from: `"TaskFlow" <${process.env.USER}>`,
      to: email,
      subject: "Welcome to TaskFlow 🎉 | Registration Successful",
      html: `
        <div style="
          background-color:#f4f4f4;
          padding: 30px;
          font-family: 'Segoe UI', sans-serif;
        ">
          <div style="
            max-width:600px;
            margin:auto;
            background:white;
            border-radius:12px;
            overflow:hidden;
            box-shadow:0 4px 10px rgba(0,0,0,0.1);
          ">
            <div style="
              background:linear-gradient(135deg,#4f46e5,#6366f1);
              color:white;
              padding:20px 30px;
              text-align:center;
            ">
              <h1 style="margin:0;font-size:28px;">Welcome to TaskFlow</h1>
              <p style="margin-top:6px;font-size:16px;">Your task journey begins here 🚀</p>
            </div>

            <div style="padding:30px 40px;text-align:left;">
              <h2 style="color:#111827;">Hi ${name},</h2>
              <p style="color:#374151;line-height:1.6;font-size:16px;">
                We’re thrilled to have you join the <b>TaskFlow</b> community!
                <br><br>
                Your registration was <b>successful</b>. You can now log in and start managing your tasks efficiently.
              </p>

              <div style="text-align:center;margin-top:30px;">
                <a href="https://TaskFlow.com/login" style="
                  background:#4f46e5;
                  color:white;
                  text-decoration:none;
                  padding:12px 25px;
                  border-radius:8px;
                  display:inline-block;
                  font-weight:600;
                ">Login to Dashboard</a>
              </div>

              <p style="color:#6b7280;font-size:14px;margin-top:30px;">
                If you didn’t register for this account, please ignore this email.
              </p>
            </div>

            <div style="
              background:#f9fafb;
              text-align:center;
              padding:15px;
              font-size:14px;
              color:#6b7280;
            ">
              <p style="margin:0;">© ${new Date().getFullYear()} TaskFlow. All rights reserved.</p>
            </div>
          </div>
        </div>
      `,
    };
    await transporter.sendMail(mailOptions);

    await $User({ name, email, password: pass, conpass: conPass }).save();

    res.status(201).json({ msg: "Registration successful!" }); // created

  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "Please enter both email & password" });

    const user = await $User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ msg: "Invalid password" });

    res.status(200).json({
      process: true,
      user: { id: user._id },
      msg: `OTP successfully sent to ${user.email}`
    });

  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

export const autoLogin = async (req, res) => {
  const id = req.cookies.token;
  if (!id) return res.status(401).json({ msg: "Token not found" }); // unauthorized
  try {
    const verifyToken = jwt.verify(id, process.env.SECRETE_KEY);
    res.status(200).json({ user: verifyToken });
  } catch (error) {
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, secure: false });
    res.status(200).json({ msg: "Logout successful" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { userId, data: { currentPassword, newPassword, conPass } } = req.body;

    const user = await $User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Wrong password" });

    if (!newPassword || !conPass)
      return res.status(400).json({ msg: "New and confirm passwords required" });
    if (newPassword !== conPass)
      return res.status(400).json({ msg: "Passwords do not match" });

    user.password = await hash(newPassword, 10);
    await user.save();

    res.status(200).json({ msg: "Password updated successfully" });

  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

export const changeDetail = async (req, res) => {
  try {
    const { userId, detail: { email, name } } = req.body;

    const user = await $User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.name = name;
    user.email = email;

    const mailOptions = {
      from: `"TaskFlow" <${process.env.USER}>`,
      to: user.email,
      subject: "Account Details Updated ✏️ | TaskFlow",
      html: `
        <div style="
          background-color:#f4f4f4;
          padding: 30px;
          font-family: 'Segoe UI', sans-serif;
        ">
          <div style="
            max-width:600px;
            margin:auto;
            background:white;
            border-radius:12px;
            overflow:hidden;
            box-shadow:0 4px 10px rgba(0,0,0,0.1);
          ">
            <div style="
              background:linear-gradient(135deg,#3b82f6,#60a5fa);
              color:white;
              padding:20px 30px;
              text-align:center;
            ">
              <h1 style="margin:0;font-size:26px;">Account Details Updated</h1>
              <p style="margin-top:6px;font-size:15px;">Your TaskFlow profile was successfully updated ✅</p>
            </div>

            <div style="padding:30px 40px;text-align:left;">
              <h2 style="color:#111827;">Hi ${user.name},</h2>
              <p style="color:#374151;line-height:1.6;font-size:16px;">
                You’ve successfully updated your account details on <b>TaskFlow</b>.
              </p>

              <p style="color:#374151;line-height:1.6;font-size:16px;">
                Here’s a summary of your updated profile:
              </p>

              <div style="
                background:#f9fafb;
                border-radius:8px;
                padding:15px 20px;
                margin-top:15px;
                font-size:15px;
                color:#111827;
                border:1px solid #e5e7eb;
              ">
                <p><b>Name:</b> ${user.name}</p>
                <p><b>Email:</b> ${user.email}</p>
              </div>

              <p style="color:#6b7280;font-size:14px;margin-top:20px;">
                If you didn’t make this change, please <b>reset your password</b> immediately to secure your account.
              </p>

              <div style="text-align:center;margin-top:25px;">
                <a href="https://TaskFlow.com/profile" style="
                  background:#3b82f6;
                  color:white;
                  text-decoration:none;
                  padding:12px 25px;
                  border-radius:8px;
                  display:inline-block;
                  font-weight:600;
                ">View Profile</a>
              </div>
            </div>

            <div style="
              background:#f9fafb;
              text-align:center;
              padding:15px;
              font-size:14px;
              color:#6b7280;
            ">
              <p style="margin:0;">© ${new Date().getFullYear()} TaskFlow. All rights reserved.</p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    await user.save();

    res.status(200).json({ msg: "Details updated" });

  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId)
      return res.status(400).json({ msg: "User not found. Please login again." });

    const user = await $User.findById(userId);
    if (!user)
      return res.status(404).json({ msg: "User not found. Please login again." });

    const otp = Math.floor(100000 + Math.random() * 900000);

    const sendEmail = {
      from: process.env.USER,
      to: user.email,
      subject: "🔐 Your One-Time Password (OTP)",
      html: `
    <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        
        <div style="text-align: center;">
          <h2 style="color: #4CAF50; margin-bottom: 10px;">OTP Verification</h2>
          <p style="color: #555; font-size: 15px; margin-top: 0;">
            Hello <strong>${user.name || "User"}</strong>,<br/>
            Please use the following One-Time Password (OTP) to complete your verification:
          </p>
        </div>

        <div style="text-align: center; margin: 25px 0;">
          <span style="display: inline-block; font-size: 28px; letter-spacing: 6px; font-weight: bold; color: #ffffff; background: #4CAF50; padding: 12px 30px; border-radius: 8px;">
            ${otp}
          </span>
        </div>

        <p style="color: #555; font-size: 14px; text-align: center;">
          ⏳ This OTP is valid for <strong>10 minutes</strong>.<br/>
          Do not share this code with anyone for security reasons.
        </p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

        <p style="font-size: 12px; color: #999; text-align: center;">
          If you did not request this OTP, please ignore this email.<br/>
          © ${new Date().getFullYear()} Your App. All rights reserved.
        </p>
      </div>
    </div>
  `
    };
    await transporter.sendMail(sendEmail);

    user.verifyOtp = otp;
    user.expireOtp = Date.now() + 5 * 60 * 1000;
    await user.save();

    res.status(200).json({
      success: true,
      msg: `OTP successfully sent to ${user.email}`,
    });

  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { userId, data: { otp } } = req.body;

    if (!userId) return res.status(400).json({ msg: "User not found" });
    if (!otp) return res.status(400).json({ msg: "OTP is required" });

    const user = await $User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.verifyOtp !== otp) return res.status(401).json({ msg: "Invalid OTP" });
    if (user.expireOtp < Date.now())
      return res.status(410).json({ msg: "OTP expired" }); // Gone

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET || process.env.SECRETE_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });

    const mailOptions = {
      from: `"TaskFlow" <${process.env.USER}>`,
      to: user.email,
      subject: "Login Successful ✅ | TaskFlow",
      html: `
        <div style="background-color:#f4f4f4;padding:30px;font-family:'Segoe UI',sans-serif;">
          <div style="max-width:600px;margin:auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.1);">
            <div style="background:linear-gradient(135deg,#10b981,#34d399);color:white;padding:20px 30px;text-align:center;">
              <h1 style="margin:0;font-size:26px;">Login Successful</h1>
              <p style="margin-top:6px;font-size:15px;">Welcome back to TaskFlow 🚀</p>
            </div>

            <div style="padding:30px 40px;text-align:left;">
              <h2 style="color:#111827;">Hi ${user.name},</h2>
              <p style="color:#374151;line-height:1.6;font-size:16px;">
                You have successfully logged into your <b>TaskFlow</b> account.
              </p>
              <p style="color:#374151;line-height:1.6;font-size:16px;">
                If this was you, great! You can now manage your tasks.
                <br><br>
                If this wasn’t you, please <b>reset your password immediately</b> for security.
              </p>

              <div style="text-align:center;margin-top:30px;">
                <a href="https://TaskFlow.com/dashboard" style="background:#10b981;color:white;text-decoration:none;padding:12px 25px;border-radius:8px;display:inline-block;font-weight:600;">
                  Go to Dashboard
                </a>
              </div>
            </div>

            <div style="background:#f9fafb;text-align:center;padding:15px;font-size:14px;color:#6b7280;">
              <p style="margin:0;">© ${new Date().getFullYear()} TaskFlow. All rights reserved.</p>
            </div>
          </div>
        </div>
      `,
    };
    await transporter.sendMail(mailOptions);

    user.verifyOtp = null;
    user.expireOtp = null;
    user.isActive = true;
    await user.save();

    res.status(200).json({
      success: true,
      msg: "Login successful. Confirmation email sent."
    });

  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId)
      return res.status(401).json({ success: false, msg: "Login again to continue." });

    const user = await $User.findById(userId);
    if (!user)
      return res.status(404).json({ success: false, msg: "User not found." });

    const otp = Math.floor(100000 + Math.random() * 900000);

    const mailOptions = {
      from: process.env.USER,
      to: user.email,
      subject: "🔐 Your Verification OTP (Valid for 5 Minutes)",
      html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f9fafb; padding: 25px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 6px 16px rgba(0,0,0,0.1);">

          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #2c3e50; margin: 0;">Email Verification OTP</h2>
            <p style="color: #7f8c8d; font-size: 14px; margin-top: 8px;">
              Hello <strong>${user.name || "User"}</strong>,<br/>
              Use the OTP below to verify your account or complete login:
            </p>
          </div>

          <div style="text-align: center; margin: 25px 0;">
            <span style="display: inline-block; font-size: 30px; letter-spacing: 6px; font-weight: bold; color: #ffffff; background: linear-gradient(90deg, #667eea, #764ba2); padding: 14px 40px; border-radius: 10px;">
              ${otp}
            </span>
          </div>

          <p style="color: #555; font-size: 14px; text-align: center; margin-top: 15px;">
            ⏳ This OTP will expire in <strong>5 minutes</strong>.<br/>
            For your security, do not share this OTP with anyone.
          </p>

          <div style="margin-top: 30px; text-align: center;">
            <a href="${process.env.CLIENT_URL}/verification" 
               style="display: inline-block; padding: 12px 28px; background: #4f46e5; color: #fff; font-size: 14px; font-weight: bold; border-radius: 6px; text-decoration: none;">
              Verify Now
            </a>
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

          <p style="font-size: 12px; color: #999; text-align: center; line-height: 1.5;">
            ⚠️ If you did not request this OTP, please ignore this email.<br/>
            © ${new Date().getFullYear()} SecureAuth. All rights reserved.
          </p>
        </div>
      </div>
      `
    };

    await transporter.sendMail(mailOptions);

    user.verifyOtp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000;
    await user.save();

    res.status(200).json({
      success: true,
      msg: `A new OTP has been sent to ${user.email}.`,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to resend OTP. Try again later.",
      error: error.message,
    });
  }
};
