export interface RepoModel {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    html_url: string;
    description: string | null;
}