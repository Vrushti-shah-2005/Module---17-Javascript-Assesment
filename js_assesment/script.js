export default class CustomerFormHandler {

  constructor(form) {
    this.form = form;
    this.msg = document.getElementById("msg");
  }

  // Show Message
  showMessage(text, type) {
    this.msg.textContent = text;
    this.msg.className = type;
    this.msg.style.display = "block";
    setTimeout(() => (this.msg.style.display = "none"), 3000);
  }

  // Real-time validation
  validateField(id) {
    const value = document.getElementById(id).value.trim();

    switch (id) {
      case "name":
        return value.length >= 3
          ? true
          : (this.showMessage("Name must be at least 3 characters.", "error"), false);

      case "phone":
        return /^[0-9]{10}$/.test(value)
          ? true
          : (this.showMessage("Phone must be 10 digits.", "error"), false);

      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? true
          : (this.showMessage("Invalid Email Format", "error"), false);

      case "vehicle":
        return value !== ""
          ? true
          : (this.showMessage("Vehicle details required.", "error"), false);

      case "complaint":
        return value.length >= 10
          ? true
          : (this.showMessage("Complaint must be at least 10 characters.", "error"), false);
    }
  }

  validateForm() {
    return (
      this.validateField("name") &&
      this.validateField("phone") &&
      this.validateField("email") &&
      this.validateField("vehicle") &&
      this.validateField("complaint")
    );
  }

  saveToLocalStorage(data) {
    const records = JSON.parse(localStorage.getItem("customerData")) || [];
    records.push(data);
    localStorage.setItem("customerData", JSON.stringify(records));
  }

  clearForm() {
    this.form.reset();
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.validateForm()) return;

    const data = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      vehicle: document.getElementById("vehicle").value,
      complaint: document.getElementById("complaint").value,
    };

    this.saveToLocalStorage(data);
    this.showMessage("Form submitted successfully!", "success");
    this.clearForm();
  }
}
