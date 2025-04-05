package tech.buildrun.controller;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import tech.buildrun.dto.CourseDTO;
import tech.buildrun.services.CourseService;

import java.util.List;
import java.util.UUID;

@Path("/courses")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GET
    public Response findAll(@QueryParam("page") @DefaultValue("0") Integer page,
                            @QueryParam("size") @DefaultValue("10") Integer size) {

        List<CourseDTO> courses = courseService.findAll(page, size);
        return Response.ok(courses).build();
    }

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") UUID courseId) {
        CourseDTO course = courseService.findById(courseId);
        return Response.ok(course).build();
    }

    @POST
    @Transactional
    public Response create(CourseDTO courseDTO) {
        CourseDTO created = courseService.createCourse(courseDTO);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") UUID courseId, CourseDTO courseDTO) {
        CourseDTO updated = courseService.updateCourse(courseId, courseDTO);
        return Response.ok(updated).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") UUID courseId) {
        courseService.deleteById(courseId);
        return Response.noContent().build();
    }
}
