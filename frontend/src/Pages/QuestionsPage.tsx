import { Navbar } from "@/components/NavBar";
import { authStore } from "@/store/auth.store";
import { useEffect } from "react";

const QuestionsPage = () => {
    const allQuestions = authStore(state => state.allQuestions);
    const isLoading = authStore(state => state.isLoading);
    const error = authStore(state => state.error);
    const getAllQuestions = authStore.getState().getAllQuestions;

    useEffect(() => {
        getAllQuestions();
    }, []);

    // Function to parse and format the question string
    const formatQuestion = (questionText: string) => {
        const sections = questionText.split('\n').filter(line => line.trim() !== '');
        return sections.map((section, index) => {
            if (section.trim().endsWith(':')) {
                return (
                    <h3 key={index} className="font-bold text-lg mt-4 mb-2 text-blue-600">
                        {section}
                    </h3>
                );
            }
            // Check if section is an example
            else if (section.startsWith('Example') || section.startsWith('Input:')) {
                return (
                    <div key={index} className="bg-gray-50 p-3 rounded-md my-2 font-mono text-sm">
                        {section}
                    </div>
                );
            }
            // Regular paragraph
            else {
                return (
                    <p key={index} className="my-2">
                        {section}
                    </p>
                );
            }
        });
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading questions...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-6xl font-bold text-center mb-8 text-gray-800">
                    All-Questions
                </h1>
                <div className="grid gap-8">
                    {allQuestions.length > 0 ? (
                        allQuestions.map((question:any, index:number) => (
                            <div 
                                key={index} 
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {question.title || `Question ${index+1}`}
                                    </h2>
                                    <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                                        {question.difficulty || "Unknown Difficulty"}
                                    </span>
                                </div>
                                
                                <div className="prose max-w-none">
                                    {formatQuestion(question.question)}
                                </div>
                                
                                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                                    <div className="flex flex-wrap gap-2">
                                        {question.tags?.split(',').map((tag:string, i:number) => (
                                            <span 
                                                key={i} 
                                                className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                                            >
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-8">No questions found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuestionsPage;