const ErrorApi = require("../error/errorApi");
const { validationResult } = require("express-validator");
const meetupService = require("../services/meetupService");
const MeetupDto = require("../dto/meetupDto");

class MeetupController {
  async getAll(req, res, next) {
    try {
      let { keywords, limit, page, sort} = req.query;
      page = page || 1;
      limit = limit || 5;
      sort = sort || "meetupDate"
      let offset = page * limit - limit;
      let meetups;
      if (!keywords) {
        meetups = await meetupService.getAll(limit, offset, sort);
      }
      if (keywords) {
        meetups = await meetupService.getAllByKeywords(limit, offset, sort, keywords);
      }
      return res.json(meetups);
    } catch (e) {
      next(e);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const meetup = await meetupService.getById(id);
      if (!meetup) {
        next(ErrorApi.notFound("ID is not fount"));
      }
      return res.json(meetup);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        next(ErrorApi.badRequest("Validation error", validationErrors.array()));
      }
      const meetupDto = new MeetupDto(req.body);
      const meetup = await meetupService.create(meetupDto, req.res.user.id);
      return res.json(meetup);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        next(ErrorApi.badRequest("Validation error", validationErrors.array()));
      }
      const { id } = req.params;
      const meetupDto = new MeetupDto(req.body);
      const meetup = await meetupService.getById(id);
      if (!meetup) {
        next(ErrorApi.notFound("ID is not fount"));
      }
      await meetupService.update(meetupDto, id);

      return res.status(200).json({ message: "Updated" });
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const meetup = await meetupService.getById(id);
      if (!meetup || !id) {
        next(ErrorApi.notFound("ID is not fount"));
      }
      await meetupService.destroy(id);
      return res.status(204).json({ message: "No Content" });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new MeetupController();
