package tech.buildrun.controller;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import tech.buildrun.entity.AdminEntity;
import tech.buildrun.services.AdminService;

import java.util.Map;
import java.util.UUID;

@Path("/admins")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GET
    public Response findAll(@QueryParam("page") @DefaultValue("0") Integer page, @QueryParam("size") @DefaultValue("10") Integer size) {
        var admins = adminService.findAll(page, size);
        return Response.ok(admins).build();
    }

    @Path("/{id}")
    @GET
    public Response findOne(@PathParam("id") UUID adminId) {
        return Response.ok(adminService.findById(adminId)).build();
    }

    @POST
    @Transactional
    public Response createAdmin(AdminEntity adminEntity) {
        return Response.ok(adminService.createAdmin(adminEntity)).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response updateAdmin(@PathParam("id") UUID adminId, AdminEntity adminEntity) {
        return Response.ok(adminService.updateAdmin(adminId, adminEntity)).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteById(@PathParam("id") UUID adminId) {
        adminService.deleteById(adminId);
        return Response.noContent().build();
    }

    @POST
    @Path("/login")
    public Response login(Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        AdminEntity admin = adminService.login(email, password);

        return Response.ok(Map.of("message", "Login realizado com sucesso!", "admin", admin.email)).build();
    }

    @POST
    @Path("/logout")
    public Response logout() {
        adminService.logout();
        return Response.ok(Map.of("message", "Logout realizado com sucesso!")).build();
    }
}
