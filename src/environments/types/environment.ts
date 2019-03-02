export type Environment = {
    id: string;
    docker: boolean;
    git: boolean;
    node: boolean;
    scripts: string[];
    authorId: string;
    name: string;
};
