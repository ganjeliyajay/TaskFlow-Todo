import mongoose from "mongoose"

export const db = async () => {
    try {
        await mongoose.connect(process.env.DB)
        console.log("Databse Is Connected ")
    } catch (error) {
        console.error("Database connection failed:", error)
        process.exit(1)
    }
}