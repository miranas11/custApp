const Service = require("../models/Service");

const searchServices = async (req, res) => {
    const { location, serviceType, category, date } = req.query;

    try {
        let query = {};

        if (location) {
            query["location.city"] = { $regex: location, $options: "i" };
        }
        if (serviceType) {
            query.serviceType = { $regex: serviceType, $options: "i" };
        }
        if (category) {
            query.category = { $regex: category, $options: "i" };
        }
        if (date) {
            query.date = { $eq: new Date(date) };
        }
        console.log(query);
        const services = await Service.find(query);

        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: "Error fetching services1", error });
    }
};
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: "Error fetching services", error });
    }
};

const getServiceById = async (req, res) => {
    try {
        const serviceId = req.params.id;

        // Fetch the service by ID
        const service = await Service.findById(serviceId);

        // If service not found, return 404
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        // Return the service details
        res.status(200).json(service);
    } catch (error) {
        console.error("Error fetching service details:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { searchServices, getAllServices, getServiceById };
