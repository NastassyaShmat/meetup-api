const { Meetup } = require("../models/models");
const ErrorApi = require("../error/errorApi");
const { validationResult } = require("express-validator");

class MeetupController {
  async getAll(req, res) {
    const meetups = await Meetup.findAll();
    return res.json(meetups);
  }

  async getById(req, res, next) {
    const { id } = req.params;
    const meetup = await Meetup.findOne({ where: { id } });
    if (!meetup) {
      return next(ErrorApi.badRequest("ID is not fount"));
    }
    return res.json(meetup);
  }

  async create(req, res, next) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        next(ErrorApi.badRequest("Validation error", validationErrors.array()));
      }
      const { meetupId, title, content, meetupDate, meetupLocation, keywords } =
        req.body;
      const meetup = await Meetup.create({
        meetupId,
        title,
        content,
        meetupDate,
        meetupLocation,
        keywords,
      });
      return res.json(meetup);
    } catch (e) {
      return next(ErrorApi.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    if (!id) {
      return next(ErrorApi.badRequest("ID is not fount"));
    }
    const { title, content, meetupDate, meetupLocation, keywords } = req.body;
    await Meetup.update(
      {
        title: title,
        content: content,
        meetupDate: meetupDate,
        meetupLocation: meetupLocation,
        keywords: keywords,
      },
      { where: { id: id } },
      { multi: true }
    );
    return res.status(200).json({ message: "Updated" });
  }

  async delete(req, res, next) {
    const { id } = req.params;
    if (!id) {
      return next(ErrorApi.badRequest("ID is not fount"));
    }
    await Meetup.destroy({ where: { id } });
    return res.status(204).json({ message: "No Content" });
  }
}

module.exports = new MeetupController();
