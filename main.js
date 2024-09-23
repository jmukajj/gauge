class GaugeChartWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.width = 400;
    this.height = 300;
    this.minValue = 0;
    this.maxValue = 100;
    this.currentValue = 50;
    
    // Create a container for the gauge chart
    const container = document.createElement("div");
    container.style.width = `${this.width}px`;
    container.style.height = `${this.height}px`;
    container.style.border = "1px solid #ccc";
    this.shadowRoot.appendChild(container);

    // Add the canvas for Chart.js or an SVG for a custom gauge
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);
    
    // Initial render
    this.renderGauge(canvas);
  }

  static get observedAttributes() {
    return ["currentValue"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "currentValue") {
      this.currentValue = Number(newValue);
      this.updateGauge();
    }
  }

  renderGauge(canvas) {
    const ctx = canvas.getContext("2d");

    // Use Chart.js (or your preferred library) to create a gauge chart
    this.chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [this.currentValue, this.maxValue - this.currentValue],
            backgroundColor: ["#4caf50", "#ccc"]
          }
        ]
      },
      options: {
        circumference: Math.PI,
        rotation: Math.PI,
        cutoutPercentage: 80,
        responsive: false,
        maintainAspectRatio: false
      }
    });
  }

  updateGauge() {
    // Update the gauge chart with the new value
    if (this.chart) {
      this.chart.data.datasets[0].data[0] = this.currentValue;
      this.chart.data.datasets[0].data[1] = this.maxValue - this.currentValue;
      this.chart.update();
    }
  }

  // Custom method to update the gauge value
  setCurrentValue(value) {
    this.currentValue = value;
    this.updateGauge();
  }
}

// Register the custom widget element
customElements.define("com-sap-sac-jm", GaugeChartWidget);
