interface UserI {
    id: string;
    name: string;
    email: string;
    image?: string;
}

export const USERS: UserI[] = [
  {
    id: "1018686180122",
    name: "Nayan",
    email: "nayan@gmail.com",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocLdwVXPrBdm21TO65GaBYcKZYT1YiGoEoILBxHi9CPM5fNS=s96-c",
  },
  {
    id: "2",
    name: "yadnesh",
    email: "yadnesh@gmail.com",
  },
];

export const MONTHS:string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];