package tech.buildrun.controller;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import tech.buildrun.entity.CourseEntity;
import tech.buildrun.services.CourseService;

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
    public Response findAll(@QueryParam("page") @DefaultValue("0") Integer page, @QueryParam("size") @DefaultValue("10") Integer size) {
        var courses = courseService.findAll(page, size);
        return Response.ok(courses).build();
    }

    @Path("/{id}")
    @GET
    public Response findOne(@PathParam("id") UUID courseId) {
        return Response.ok(courseService.getCourseWithUsers(courseId)).build();
    }

    @POST
    @Transactional
    public Response createCourse(CourseEntity courseEntity) {
        return Response.ok(courseService.createCourse(courseEntity)).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response updateCourse(@PathParam("id") UUID courseId, CourseEntity courseEntity) {
        return Response.ok(courseService.updateCourse(courseId, courseEntity)).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteById(@PathParam("id") UUID courseId) {
        courseService.deleteById(courseId);
        return Response.noContent().build();
    }
}
