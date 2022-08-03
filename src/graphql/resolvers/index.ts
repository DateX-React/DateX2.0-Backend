import UserResolvers from "./UserResolvers";

export default {
  Query: {
    ...UserResolvers.Query,
  },
  Mutation: {
    ...UserResolvers.Mutation,
  },
};
