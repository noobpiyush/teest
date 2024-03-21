import express from 'express';
import { PrismaClient } from '@prisma/client';
import { userSchema, UserData } from './inputValidation';
import cors from 'cors';
import path from 'path';
// import axios from 'axios';
import * as z from 'zod';
const app = express();
const prisma = new PrismaClient();
const port: number = 3000;
app.use(cors({
    credentials: true,
    origin: "*",
}))
app.use(express.json());
const _dirname = path.dirname("");
const buildpath = path.join(_dirname,"../client/dist/");
app.use(express.static(buildpath))

// ...

let jsonGetSolution = {
    status: { description: "Queue" },
    stderr: null,
    compile_output: null,
    stdout:null
};

// ...

let output = null;
if (jsonGetSolution.compile_output) {
    output = atob(jsonGetSolution.compile_output);
} else if (jsonGetSolution.stderr) {
    output = atob(jsonGetSolution.stderr);

}
app.post("/submit", async (req, res) => {
    try {
        const user: UserData = userSchema.parse(req.body);
        const existingUser = await prisma.user.findUnique({
            where: { username: user.username }
        });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        const newUser = await prisma.user.create({
            data: {
                username: user.username,
                code_language: user.language,
                stanndard_input: user.Stdinput,
                code: user.code,
            },
        });

        res.status(200).json(newUser);
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Handle Zod validation errors
            return res.status(400).json({ errors: error.issues });
        } else {
            console.error('Unexpected error:', error);
            res.status(500).json({ error: 'An error occurred while processing your submission' });
        }
    }
});

// app.post("/submit", async (req, res) => {
//     try {
//         const user: UserData = userSchema.parse(req.body);

//         // Username check and error handling (unchanged)
//         const existingUser = await prisma.user.findUnique({
//             where: { username: user.username }
//         });
//         // let langId:number;
//         // if (user.language == 'java') {
//         //     langId = 62;
//         // }
//         // else if(user.language == 'cpp'){
//         //     langId = 10;
//         // }
//         // else if(user.language == 'javascript'){
//         //     langId = 63;
//         // }
//         // else{
//         //     langId = 71;
//         // }

//         if (existingUser) {
//             return res.status(400).json({ error: 'Username already exists' });
//         }

//         // const response = await fetch(
//         //     "https://judge0-ce.p.rapidapi.com/submissions",
//         //     {
//         //         method: "POST",
//         //         headers: {
//         //             "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
//         //             "x-rapidapi-key": "261a5cdda3msh86527ef9bb0ed54p1a20fcjsne0b5bc86a508", // Replace with your RapidAPI key
//         //             "content-type": "application/json",
//         //             accept: "application/json",
//         //         },
//         //         body: JSON.stringify({
//         //             source_code: user.code,
//         //             stdin: user.Stdinput,
//         //             language_id: langId,
//         //           })
//         //     }
//         // );

//         // if (!response.ok) {
//         //     throw new Error(`Judge0 API error: ${response.status}`);
//         // }

//         // const jsonResponse = await response.json();

//         // let jsonGetSolution = {
//         //     status: { description: "Queue" },
//         //     stderr: null,
//         //     compile_output: null,
//         // };

//         // while (
//         //     jsonGetSolution.status.description !== "Accepted" &&
//         //     jsonGetSolution.stderr === null &&
//         //     jsonGetSolution.compile_output === null
//         // ) {
//         //     if (jsonResponse.token) {
//         //         const url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;
//         //         const getSolution = await fetch(url, {
//         //             method: "GET",
//         //             headers: {
//         //                 "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
//         //                 "x-rapidapi-key": "261a5cdda3msh86527ef9bb0ed54p1a20fcjsne0b5bc86a508", // Replace with your RapidAPI key
//         //                 "content-type": "application/json",
//         //             },
//         //         });
//         //         jsonGetSolution = await getSolution.json();
//         //     }
//         // }

//         // let output = null;
//         // if (jsonGetSolution.compile_output) {
//         //     output = atob(jsonGetSolution.compile_output);
//         // } else if (jsonGetSolution.stderr) {
//         //     output = atob(jsonGetSolution.stderr);
//         // } else if (jsonGetSolution.compile_output) {
//         //     // Assuming stdout contains the actual output, decode it
//         //     output = atob(jsonGetSolution.c);
//         // } else {
//         //     // Still handle the case where none are present
//         //     console.error('Unexpected API response:', jsonGetSolution);
//         // }
//         const newUser = await prisma.user.create({
//             data: {
//                 username: user.username,
//                 code_language: user.language,
//                 stanndard_input: user.Stdinput,
//                 code: user.code,
//             },
//         });

//         res.status(200).json(newUser);
//     } catch (error) {
//         if (error instanceof z.ZodError) {
//             // Handle Zod validation errors
//             return res.status(400).json({ errors: error.issues });
//         } else {
//             console.error('Unexpected error:', error);
//             res.status(500).json({ error: 'An error occurred while processing your submission' });
//         }
//     }
// });

app.get("/submissions/:username", async function (req, res) {

    try {

        const { username } = req.params;
        const submissions = await prisma.user.findMany({
            where: { username },
            select: {
                username: true,
                code_language: true,
                stanndard_input: true,
                code: true,
                createdAt: true,
                output: true
            }
        });

        res.status(200).json(submissions);

    } catch (error) {

        console.error('Error fetching submissions:', error);
        res.status(500).json({ error: 'An error occurred while fetching submissions' });
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});