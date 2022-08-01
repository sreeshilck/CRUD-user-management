const { login, register } = require("../Controllers/UserController");
const { adminLogin, adminPanel, deleteUser,blockUser, unBlockUser, editUser, updateUser } = require("../Controllers/AdminController")
const { verifyUser, verifyAdmin } = require("../Middlewares/AuthMiddleware");

const router = require("express").Router();

router.post("/",login)
router.post("/register",register)
router.post("/home",verifyUser)



// Admin Routes

router.post("/admin_login", login)
router.post("/admin_verify",verifyAdmin)

router.get("/admin_panel", adminPanel)
router.delete("/delete_user/:id", deleteUser)
router.get("/edit/:id", editUser)
router.post("/update/:id", updateUser)
router.put("/block_user/:id", blockUser)
router.put("/unblock_user/:id", unBlockUser)







module.exports = router;