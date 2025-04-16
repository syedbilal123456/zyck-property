// import { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   switch (req.method) {
//     case "GET":
//       return getProjectById(req, res);
//     case "PUT":
//       return updateProject(req, res);
//     case "DELETE":
//       return deleteProject(req, res);
//     default:
//       return res.status(405).json({ message: "Method not allowed" });
//   }
// }

// // ✅ Get Single Project API
// async function getProjectById(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const { id } = req.query;
//     const project = await prisma.project.findUnique({ where: { id: String(id) } });
//     if (!project) return res.status(404).json({ message: "Project not found" });
//     res.status(200).json(project);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching project" });
//   }
// }

// // ✅ Update Project API
// async function updateProject(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const { id } = req.query;
//     const project = await prisma.project.update({
//       where: { id: String(id) },
//       data: req.body,
//     });
//     res.status(200).json(project);
//   } catch (error) {
//     res.status(500).json({ error: "Error updating project" });
//   }
// }

// // ✅ Delete Project API
// async function deleteProject(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const { id } = req.query;
//     await prisma.project.delete({ where: { id: String(id) } });
//     res.status(200).json({ message: "Project deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error deleting project" });
//   }
// }
