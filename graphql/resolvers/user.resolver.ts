const users = [{ id: 1, name: 'Foo Bar', email: 'foobar', role: 'ADMIN' }];

const userResolvers = {
  Query: {
    users() {
      return users;
    },
  },
};

export default userResolvers;