const backendDomain = "http://localhost:3000";

const SummaryApi = {
  login: {
    url: `${backendDomain}/supadmin/signin`,
    method: "POST",
  },
  getAllShop:{
    url: `${backendDomain}/supadmin/shop/all`,
    method: "GET",
  },
  deleteShopById:{
    url: `${backendDomain}/supadmin/shop/:id`,
    method: "DELETE",
  },
  getAllUser:{
    url: `${backendDomain}/supadmin/users`,
    method: "GET",
  },
  deleteUserById:{
    url: `${backendDomain}/supadmin/user/:id`,
    method: "DELETE",
  }
};

export default SummaryApi;
