module.exports = class MeetupDto {
  title;
  content;
  keywords;
  meetupDate;
  meetupLocation;

  constructor(model) {
    this.title = model.title;
    this.content = model.content;
    this.keywords = model.keywords;
    this.meetupDate = model.meetupDate;
    this.meetupLocation = model.meetupLocation;
  }
};
