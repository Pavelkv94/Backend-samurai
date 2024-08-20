import { MongoClient } from "mongodb";
import { CYAN, RESET } from "../constants";

export type CourseType = {
  id: number;
  title: string;
  studentsCount: number;
};


const mongoUri = process.env.MONGO_URI || "mongodb://0.0.0.0:27017";

const client = new MongoClient(mongoUri);

export const coursesCollection = client.db("test").collection<CourseType>("Courses");

export async function runDb() {
  try {
    await client.connect();
    await client.db("test").command({ ping: 1 });
    console.log(CYAN + "Log: MongoDB connected!" + RESET);
  } catch (error) {
    console.log(error);
  }
}

//OLD DB
export type DBType = { courses: CourseType[] };

export const db: DBType = {
  courses: [
    { id: 1, title: "js", studentsCount: 10 },
    { id: 2, title: "html", studentsCount: 10 },
    { id: 3, title: "css", studentsCount: 10 },
    { id: 4, title: "REACT", studentsCount: 2 },
  ],
};
