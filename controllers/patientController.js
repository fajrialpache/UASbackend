// import Model Patient
const Patient = require("../models/Patients");
// const { body, validationResult } = require("express-validator");

class patientController {
  // menambahkan keyword async
  // menampilkan seluruh data
  async index(req, res) {
    // Memanggil method static all dengan async await
    const patients = await Patient.all();
    if (patients.length > 0) {
      const data = {
        message: "Menampilkan semua patients",
        data: patients,
      };
      return res.status(200).json(data);
    } else {
      const data = {
        message: `Patient not found`,
      };
      res.status(404).json(data);
    }
    res.json(data);
  }

  // membuat method store untuk menambahkan data
  async store(req, res) {
    // destructing object req.body
    const { name, phone, address, status, in_date_at, out_date_at } = req.body;

    // jika data undefined maka kirim response eror
    if (!name || !phone || !address || !status || !in_date_at || !out_date_at) {
      const data = {
        message: "Semua data harus dikirim",
      };
      return res.status(422).json(data);
    }

    // Memanggil method static create dengan async await
    const patients = await Patient.create(req.body);
    const data = {
      message: `Menambahkan data patient`,
      data: patients,
    };
    return res.status(201).json(data);
  }

  // membuat method update untuk mengedit data byid
  async update(req, res) {
    const { id } = req.params;
    const patient = await Patient.find(id);
    if (patient) {
      const patient = await Patient.update(id, req.body);
      const data = {
        message: `Mengedit data patient`,
        data: patient,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: `Patient not found`,
      };
      res.status(404).json(data);
    }
    res.json(data);
  }

  // membuat method destroy untuk menghapus data byid
  async destroy(req, res) {
    const { id } = req.params;
    const patient = await Patient.find(id);
    if (patient) {
      await Patient.destroy(id);
      const data = {
        message: `Menghapus data patient`,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: `Patient not found`,
      };
      res.status(404).json(data);
    }
  }

  // membuat method show untuk menampilkan detail data
  async show(req, res) {
    const { id } = req.params;
    const patient = await Patient.find(id);
    if (patient) {
      const data = {
        message: `Menampilkan detail patients`,
        data: patient,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: `Patient not found`,
      };
      res.status(404).json(data);
    }
  }

  // membuat Controller Search
  async search(req, res) {
    const name = req.params.name;
    //mencari patientn berdasarkan name
    const patients = await Patient.search(name);
    if (patients) {
      const data = {
        message: `Get searched resource`,
        data: patients,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: `Patient not found`,
      };
      res.status(404).json(data);
    }
  }

  // membuat Controller Positive
  async positive(req, res) {
    const status = "positive";
    //menampilkan data patient positif
    const patients = await Patient.findByStatus(status);

    const data = {
      message: "Get Positive Resource",
      data: patients,
    };
    res.status(200).json(data);
  }

  // membuat Controller Recovered
  async recovered(req, res) {
    const status = "recovered";
    //menampilkan data patient recovered
    const patients = await Patient.findByStatus(status);

    const data = {
      message: "Get Recovered Resource",
      data: patients,
    };
    res.status(200).json(data);
  }

  // membuat Controller Dead
  async dead(req, res) {
    const status = "dead";
    //menampilkan data patient positif
    const patients = await Patient.findByStatus(status);

    const data = {
      message: "Get Dead Resource",
      data: patients,
    };
    res.status(200).json(data);
  }
}

// Membuat object PatientController
const object = new patientController();

// Export object PatientController
module.exports = object;
