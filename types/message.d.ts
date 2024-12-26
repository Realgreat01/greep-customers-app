interface ChatPayload {
  body: string;
  to: string;
  receiverName: string;
  type: "personal" | "support";
  media?: File;
}
interface ChatEntity {
  id: string;
  from: string;
  to: string;
  body: string;
  links: any[];
  media: string | null;
  data: {
    type: "personal" | "support";
    members: string[];
  };
  isNew?: boolean;
  createdAt: number;
  updatedAt: number;
  readAt: Record<string, number>;
  __hash: string;
  __type: string;
}

interface ChatHistoryEntity {
  id: string;
  last: ChatEntity;
  data: {
    sub: {
      type: string;
      orderId: string;
    };
    type: "personal" | "support";
  };
  members: string[];
  createdAt: number;
  updatedAt: number;
  readAt: Record<string, number>;
  __hash: string;
  __type: string;
  users: Record<
    string,
    {
      id: string;
      bio: {
        username: string;
        name: {
          first: string;
          last: string;
          full: string;
        };
        photo: {
          name: string;
          type: string;
          size: number;
          duration: number;
          path: string;
          timestamp: number;
          link: string;
        };
      };
      publicName: string;
      roles: {
        isAdmin: boolean;
        isVendor: boolean;
        isVendorItems: boolean;
      };
    }
  >;
}

const x = {
  id: "676c84d2d98a47945b433e16",
  last: {
    id: "676c84d2d98a47945b433e14",
    from: "66486da2ed911ba0869cecfb",
    to: "676c849ed98a47945b433dd3",
    body: "hello",
    links: [],
    media: null,
    data: {
      type: "personal",
      members: ["66486da2ed911ba0869cecfb", "660a7df4eb3b8f4cee9e89dc"],
    },
    createdAt: 1735165138407,
    updatedAt: 1735165138407,
    readAt: { "66486da2ed911ba0869cecfb": 1735165138407 },
    __hash: "6308afb6ce11a840cec3",
    __type: "ChatEntity",
  },
  data: { type: "personal" },
  members: ["66486da2ed911ba0869cecfb", "660a7df4eb3b8f4cee9e89dc"],
  createdAt: 1735165138412,
  updatedAt: 1735165138412,
  readAt: { "66486da2ed911ba0869cecfb": 1735165138407 },
  __hash: "b923bc47d4dd82aa8142",
  __type: "ChatMetaEntity",
  users: {
    "66486da2ed911ba0869cecfb": {
      id: "66486da2ed911ba0869cecfb",
      bio: {
        username: "dindu569",
        name: { first: "Dindu", last: "Chukwuka", full: "Dindu Chukwuka" },
        photo: {
          name: "rectangle.png",
          type: "image/png",
          size: 7974,
          duration: 0,
          path: "storage/development/profiles/1727519394211-rectangle.png",
          timestamp: 1727519394211,
          link: "https://development.apis.greep.io/api/storage/development/profiles/1727519394211-rectangle.png",
        },
      },
      publicName: "Dindu Stores",
      roles: { isAdmin: true, isVendor: true, isVendorItems: true },
    },
    "660a7df4eb3b8f4cee9e89dc": {
      id: "660a7df4eb3b8f4cee9e89dc",
      bio: {
        username: "jerrygg",
        name: { first: "Godwin", last: "Jerry", full: "Godwin Jerry" },
        photo: {
          name: "images (18).jpeg",
          type: "image/jpeg",
          size: 96975,
          duration: 0,
          path: "storage/development/profiles/1734811400262-images%20(18).jpeg",
          timestamp: 1734811400262,
          link: "https://development.apis.greep.io/api/storage/development/profiles/1734811400262-images%20(18).jpeg",
        },
      },
      publicName: "Jerry Store",
      roles: { isAdmin: true, isVendor: true, isVendorFoods: true },
    },
  },
};
