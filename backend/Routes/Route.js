const { login, register } = require("../controllers/user-controller");
const { adminPanel, deleteUser, blockUser, unBlockUser, editUser, updateUser } = require("../controllers/admin-controller")
const { verifyUser, verifyAdmin } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/", login)
router.post("/register", register)
router.post("/home", verifyUser)


// Admin Routes
router.post("/admin-login", login)
router.post("/admin-verify", verifyAdmin)

router.get("/admin", adminPanel)
router.delete("/delete/:id", deleteUser)
router.get("/edit/:id", editUser)
router.post("/update/:id", updateUser)
router.put("/block/:id", blockUser)
router.put("/unblock/:id", unBlockUser)


module.exports = router;