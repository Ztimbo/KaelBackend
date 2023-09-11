const errorMessage = {
    USERNAME_ALREADY_IN_USE: {
        code: 409,
        message: 'El nombre de usuario ya está en uso'
    },
    USER_CREATED: {
        code: 201,
        message: 'Usuario creado correctamente'
    },
    GENERAL_ERROR: {
        code: 500,
        message: 'Error del servidor'
    },
    USER_NOT_FOUND: {
        code: 404,
        message: 'Usuario no encontrado'
    },
    INCORRECT_PASSWORD: {
        code: 403,
        message: 'Contraseña incorrecta'
    },
    INVALID_TOKEN: {
        code: 403,
        message: 'No estás autorizado'
    },
    USER_UPDATED: {
        code: 200,
        message: 'Usuario actualizado'
    },
    USER_DELETED: {
        code: 200,
        message: 'Usuario eliminado'
    },
    PRODUCT_NAME_ALREADY_CREATED: {
        code: 409,
        message: 'Este producto ya existe'
    },
    PRODUCT_CREATED: {
        code: 201,
        message: 'Producto creado'
    },
    PRODUCT_NOT_FOUND: {
        code: 404,
        message: 'Producto no encontrado'
    },
    PRODUCT_UPDATED: {
        code: 200,
        message: 'Producto actualizado'
    },
    PRODUCT_DELETED: {
        code: 200,
        message: 'Producto eliminado'
    }
}

export {errorMessage}