export interface Category
{
    id?: string;
    title?: string;
    slug?: string;
}

export interface Course1
{
    id?: number;
    title?: string;
    slug?: string;
    description?: string;
    category?: string;
    duration?: number;
    steps?: {
        order?: number;
        title?: string;
        subtitle?: string;
        content?: string;
    }[];
    totalSteps?: number;
    updatedAt?: Date;
    featured?: boolean;
    progress?: {
        currentStep?: number;
        completed?: number;
    };
}
