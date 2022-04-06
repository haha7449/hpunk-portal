import Home from "../pages/home/home";

import ShopHome from "../pages/shop/shopHome";
import Food from "../pages/shop/food";
import Makeup from "../pages/shop/makeup";
import Sport from "../pages/shop/sport";

import BaikeHome from "../pages/baike/baikeHome";
import X from "../pages/baike/x";

import {
  HomeOutlined,
  ShoppingOutlined,
  BookOutlined,
  CloudOutlined,
} from "@ant-design/icons";
import IconFont from "../assets/icon";

const NavRoutes = [
  {
    key: "home",
    path: "/",
    component: Home,
    exact: true,
    text: "首页",
    icon: <HomeOutlined />,
  },
  {
    key: "shop",
    path: "/shop",
    component: ShopHome,
    exact: false,
    text: "购物",
    icon: <ShoppingOutlined />,
    subs: [
      {
        key: "food",
        path: "/food",
        component: Food,
        exact: true,
        text: "食物",
      },
      {
        key: "makeup",
        path: "/makeup",
        component: Makeup,
        exact: true,
        text: "化妆",
      },
      {
        key: "sport",
        path: "/sport",
        component: Sport,
        exact: true,
        text: "运动",
      },
    ],
  },
  {
    key: "baike",
    path: "/baike",
    component: BaikeHome,
    exact: false,
    text: "养生百科",
    icon: <BookOutlined />,
    subs: [
      { key: "x", path: "/x", component: X, exact: true, text: "待定" },
    ],
  },
];

export default NavRoutes;
