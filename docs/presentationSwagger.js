/**
 * @swagger
 * tags:
 *   name: Presentations
 *   description: API for managing presentations
 */

/**
 * @swagger
 * tags:
 *   name: Slides
 *   description: API for managing slides within presentations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Slide:
 *       type: object
 *       properties:
 *         content:
 *           type: string
 *           description: The content of the slide
 *       required:
 *         - content
 *       example:
 *         content: "This is the content of the slide"
 *     Presentation:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the presentation
 *         authors:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of authors for the presentation
 *         slides:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Slide'
 *           description: A list of slides in the presentation
 *       required:
 *         - title
 *         - authors
 *       example:
 *         title: "Introduction to Node.js"
 *         authors:
 *           - "John Doe"
 *           - "Jane Doe"
 *         slides:
 *           - content: "Welcome to Node.js presentation"
 */

/**
 * @swagger
 * /presentations:
 *   post:
 *     summary: Create a new presentation
 *     tags: [Presentations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - authors
 *             properties:
 *               title:
 *                 type: string
 *               authors:
 *                 type: array
 *                 items:
 *                   type: string
 *               slides:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *     responses:
 *       201:
 *         description: New presentation created
 *       400:
 *         description: Title and authors are required
 *       409:
 *         description: Duplicate title
 */

/**
 * @swagger
 * /presentations:
 *   get:
 *     summary: Get all presentations
 *     tags: [Presentations]
 *     responses:
 *       200:
 *         description: A list of presentations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Presentation'
 */

/**
 * @swagger
 * /presentations/{title}:
 *   get:
 *     summary: Get a presentation by title
 *     tags: [Presentations]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: The presentation title
 *     responses:
 *       200:
 *         description: A presentation object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Presentation'
 *       404:
 *         description: Presentation not found
 */

/**
 * @swagger
 * /presentations/{title}:
 *   delete:
 *     summary: Delete a presentation by title
 *     tags: [Presentations]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: The presentation title
 *     responses:
 *       204:
 *         description: Presentation deleted
 *       404:
 *         description: Presentation not found
 */

/**
 * @swagger
 * /presentations/{title}/slides:
 *   post:
 *     summary: Add a slide to a presentation
 *     tags: [Slides]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: The presentation title
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Slide added to presentation
 *       400:
 *         description: Slide content is required
 *       404:
 *         description: Presentation not found
 */

/**
 * @swagger
 * /presentations/{title}/slides/{slideId}:
 *   patch:
 *     summary: Update a slide in a presentation
 *     tags: [Slides]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: The presentation title
 *       - in: path
 *         name: slideId
 *         required: true
 *         schema:
 *           type: string
 *         description: The slide ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Slide updated
 *       400:
 *         description: Slide content is required
 *       404:
 *         description: Presentation or slide not found
 */

/**
 * @swagger
 * /presentations/{title}/slides/{slideId}:
 *   delete:
 *     summary: Delete a slide from a presentation
 *     tags: [Slides]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: The presentation title
 *       - in: path
 *         name: slideId
 *         required: true
 *         schema:
 *           type: string
 *         description: The slide ID
 *     responses:
 *       200:
 *         description: Slide deleted
 *       404:
 *         description: Presentation or slide not found
 */

/**
 * @swagger
 * /presentations/{title}/authors:
 *   patch:
 *     summary: Update the authors list in a presentation
 *     tags: [Presentations]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: The presentation title
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               authors:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Authors list updated
 *       400:
 *         description: Authors list is required
 *       404:
 *         description: Presentation not found
 */
