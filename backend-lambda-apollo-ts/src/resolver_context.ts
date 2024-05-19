export type User = {
  id: string;
  name: string | null;
  email: string | null;
};

export interface ResolverContext {
  user?: User;
}
