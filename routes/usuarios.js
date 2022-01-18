const { Router } = require("express");
const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);
router.put("/:ctm", usuariosPut);
router.post("/", usuariosPost);
router.patch("/", usuariosPatch);
router.delete("/", usuariosDelete);

module.exports = router;
