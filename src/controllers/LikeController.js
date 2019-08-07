const Dev = require('../models/Dev')

module.exports = {
	async store(req, res) {
		const { user } = req.headers //* User logged
		const { devId } = req.params //* User to like

		const loggedDev = await Dev.findById(user)
		const targetDev = await Dev.findById(devId)

		if (!targetDev) {
			return res.status(400).json({ error: 'Dev not exists' })
		}

		if (targetDev.likes.includes(loggedDev._id)) {
			console.log('Match')
		}

		loggedDev.likes.push(targetDev._id)

		await loggedDev.save()

		return res.json(loggedDev)
	}
}
