const { Meetup } = require("../models/models");

class MeetupService {
  async getAll(limit, offset, sort) {
    const meetups = await Meetup.findAndCountAll({
      limit,
      offset,
      order: [[sort]],
    });
    return meetups;
  }

  async getAllByKeywords(limit, offset, sort, keywords) {
    const allmeetups = await Meetup.findAndCountAll({
      limit,
      offset,
      order: [[sort]],
    });
    const meetups = allmeetups.rows.filter((meetup) =>
      meetup.dataValues.keywords.includes(keywords)
    );
    return {
      count: meetups.length,
      rows: meetups,
    };
  }

  async getById(id) {
    const meetup = await Meetup.findOne({ where: { id } });
    return meetup;
  }

  async create(meetupDto, userId) {
    const meetup = await Meetup.create({ ...meetupDto, userId });
    return meetup;
  }

  async update(meetupDto, id) {
    return await Meetup.update(
      meetupDto,
      { where: { id: id } },
      { multi: true }
    );
  }

  async delete(id) {
    return await Meetup.destroy(id);
  }
}

module.exports = new MeetupService();
