package tech.buildrun.controller;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import tech.buildrun.dto.UserDTO;
import tech.buildrun.services.UserService;

import java.util.List;
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
    public Response findAll(@QueryParam("page") @DefaultValue("0") Integer page,
                            @QueryParam("size") @DefaultValue("10") Integer size) {

        List<UserDTO> users = userService.findAll(page, size);
        return Response.ok(users).build();
    }

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") UUID userId) {
        UserDTO user = userService.findById(userId);
        return Response.ok(user).build();
    }

    @POST
    @Transactional
    public Response create(UserDTO userDTO) {
        UserDTO created = userService.createUser(userDTO);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") UUID userId, UserDTO userDTO) {
        UserDTO updated = userService.updateUser(userId, userDTO);
        return Response.ok(updated).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") UUID userId) {
        userService.deleteById(userId);
        return Response.noContent().build();
    }

    @PUT
    @Path("/{userId}/courses/{courseId}")
    @Transactional
    public Response assignCourse(@PathParam("userId") UUID userId, @PathParam("courseId") UUID courseId) {
        userService.assignUserToCourse(userId, courseId);
        return Response.noContent().build();
    }
}
