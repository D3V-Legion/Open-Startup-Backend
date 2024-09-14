const collaborationService = require('./collaborationService');

const handleProjectCreate = async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const result = await collaborationService.createProject(title, description, req.id);
  res.status(result.status).json({ message: result.message, project: result.project });
}

module.exports = { handleProjectCreate };