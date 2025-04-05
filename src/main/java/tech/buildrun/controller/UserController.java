package tech.buildrun.controller;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import tech.buildrun.entity.UserEntity;
import tech.buildrun.services.UserService;

import java.util.UUID;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GET
    public Response findAll(@QueryParam("page") @DefaultValue("0") Integer page, @QueryParam("size") @DefaultValue("10") Integer size) {
        var users = userService.findAll(page, size);
        return Response.ok(users).build();
    }

    @Path("/{id}")
    @GET
    public Response findOne(@PathParam("id") UUID userId) {
        return Response.ok(userService.findById(userId)).build();
    }

    @POST
    @Transactional
    public Response createUser(UserEntity userEntity) {
        return Response.ok(userService.createUser(userEntity)).build();
    }
}
