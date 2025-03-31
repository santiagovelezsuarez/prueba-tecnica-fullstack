export const hasRole = (roles: string[], resolver: Function) => {
    return async (parent: any, args: any, context: any, info: any) => {        
        if (!context.session || !context.session.user) {
            throw new Error("No autorizado!!!");
        }

        if (!roles.includes(context.session.user.role)) {
            throw new Error("Acceso denegado: No tienes permisos suficientes");
        }
        return resolver(parent, args, context, info);
    };
};