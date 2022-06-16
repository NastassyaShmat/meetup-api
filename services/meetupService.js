const { Meetup } = require("../models/models");
const ErrorApi = require("../error/errorApi");

class MeetupService {
  async getAll(limit, offset) {
    const meetups = await Meetup.findAndCountAll({
      limit,
      offset,
      order: [["meetupDate"]],
    });
    return meetups;
  }

  async getAllByKeywords(limit, offset, keywords) {
    // const allmeetups = await Meetup.findAndCountAll({
    //   limit,
    //   offset,
    //   order: [["meetupDate"]],
    // });
    // meetups = allmeetups.rows.filter((meetup) =>
    //   meetup.dataValues.keywords.includes(key)
    // );
    const meetups = await Meetup.findAndCountAll({
      where: { keywords },
      limit,
      offset,
      order: [["meetupDate"]],
    });
    return meetups;
  }

  async getById(id) {
    const meetup = await Meetup.findOne({ where: { id } });
    return meetup;
  }

  async create(meetupDto) {
    const meetup = await Meetup.create(meetupDto);
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
