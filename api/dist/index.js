"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const inputValidation_1 = require("./inputValidation");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
// import axios from 'axios';
const z = __importStar(require("zod"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const port = 3000;
app.use((0, cors_1.default)({
    credentials: true,
    origin: "*",
}));
app.use(express_1.default.json());
const _dirname = path_1.default.dirname("");
const buildpath = path_1.default.join(_dirname, "../client/dist/");
app.use(express_1.default.static(buildpath));
// ...
let jsonGetSolution = {
    status: { description: "Queue" },
    stderr: null,
    compile_output: null,
    stdout: null
};
// ...
let output = null;
if (jsonGetSolution.compile_output) {
    output = atob(jsonGetSolution.compile_output);
}
else if (jsonGetSolution.stderr) {
    output = atob(jsonGetSolution.stderr);
}
app.post("/submit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = inputValidation_1.userSchema.parse(req.body);
        const existingUser = yield prisma.user.findUnique({
            where: { username: user.username }
        });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        const newUser = yield prisma.user.create({
            data: {
                username: user.username,
                code_language: user.language,
                stanndard_input: user.Stdinput,
                code: user.code,
            },
        });
        res.status(200).json(newUser);
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            // Handle Zod validation errors
            return res.status(400).json({ errors: error.issues });
        }
        else {
            console.error('Unexpected error:', error);
            res.status(500).json({ error: 'An error occurred while processing your submission' });
        }
    }
}));
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
app.get("/submissions/:username", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username } = req.params;
            const submissions = yield prisma.user.findMany({
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
        }
        catch (error) {
            console.error('Error fetching submissions:', error);
            res.status(500).json({ error: 'An error occurred while fetching submissions' });
        }
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
