import { links } from '../database/models/index';

/**
 * @class LinkController
 * @description controller for links
 * @exports LinkController
 */
class LinkController {
  /**
     * @method addLink
     * @description Method for adding links
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} response body object
     */
  static async addLink(req, res) {
    const {
      title, author, comment, tags, category, link,
    } = req.body;
    try {
      const newLink = new links({
        title, author, comment, tags, category, link,
      });
      const theLink = await links.findOne({ link });
      if (theLink) {
        return res.status(409).json({ status: 409, error: 'This link has been added already.' });
      }
      await newLink.save();
      return res.status(201).json({
        status: 201,
        message: 'Success!',
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'An error occurred.' });
    }
  }

  /**
     * @method getLink
     * @description Method for getting a links
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} response body object
     */
  static async getLink(req, res) {
    const { linkId } = req.params;
    try {
      const thelink = await links.findById({ _id: linkId });
      if (!thelink) {
        return res.status(404).json({ status: 404, error: 'Not found.' });
      }
      const {
        _doc: {
          title, author, category, comment, tags, link,
        },
      } = thelink;
      return res.status(200)
        .json({
          status: 200,
          message: 'Success!',
          data: {
            title,
            author,
            category,
            comment,
            tags,
            link,
          },
        });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'An error occurred.' });
    }
  }


  /**
     * @method getAllLinks
     * @description Method for getting all links
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} response body object
     */
  static async getAllLinks(req, res) {
    try {
      const thelinks = await links.find()
        .select('-_id')
        .select('-updatedAt')
        .select('-createdAt')
        .select('-__v');
      if (thelinks <= 0) {
        return res.status(404).json({ status: 404, error: 'Not resource found!' });
      }
      return res.status(200)
        .json({
          status: 200,
          message: 'Success!',
          data: thelinks,
        });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'An error occurred.' });
    }
  }

  /**
     * @method updateLink
     * @description Method for updating a link or resource
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} response body object
     */
  static async updateLink(req, res) {
    const {
      title, author, comment, category, tags, link,
    } = req.body;
    try {
      const { _id: linkId } = req.params;
      await links.findOneAndUpdate(
        { linkId },
        {
          title, author, comment, category, tags, link,
        },
        { new: true },
      );
      return res.status(200).json({
        status: 200,
        message: 'Success!',
        data: {
          title, author, comment, category, tags, link,
        },
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'An error occurred.' });
    }
  }

  /**
     * @method deleteLink
     * @description Method for deleting a link or resource
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} response body object
     */
  static async deleteLink(req, res) {
    const { linkId } = req.params;
    try {
      const link = await links.findByIdAndDelete({ _id: linkId });
      if (!link) {
        return res.status(404).json({ status: 404, message: 'Not found.' });
      } return res.status(200).json({ status: 200, message: 'Success!' });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'An error occurred.' });
    }
  }
}

export default LinkController;
