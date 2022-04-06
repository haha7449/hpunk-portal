import {
  HomeOutlined,
  ShoppingOutlined,
  BookOutlined,
  CloudOutlined,
} from "@ant-design/icons";
import Home from "../pages/home/home";

import ShopHome from "../pages/shop/shopHome";
import Food from "../pages/shop/food";

import BaikeHome from "../pages/baike/baikeHome";

import NoFoundPage from "../pages/404";

const routes = [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/home",
        component: Home,
        text: "首页",
        icon: <HomeOutlined />,
      },
      {
        path: "/shop",
        component: ShopHome,
        text: "购物",
        icon: <ShoppingOutlined />,
        routes: [
          {
            path: "/food",
            component: Food,
          },
          {
            path: "/makeup",
            component: "../pages/shop/makeup",
          },
          {
            path: "/sport",
            component: "../pages/shop/sport",
          },
        ],
      },
      {
        path: "/baike",
        component: BaikeHome,
        text: "百科",
        icon: <BookOutlined />,
        routes: [
          {
            path: "/x",
            component: "../pages/baike/x",
          },
        ],
      },
    ],
  },
  {
    path: "/404",
    component: NoFoundPage,
  },
];
export default routes;

