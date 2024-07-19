"use strict";
class EventManager {
  constructor() {
    this.events = {};
  }

  subscribe(event, ...listeners) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    listeners.forEach((listener) => {
      this.events[event].push(listener);
    });
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((listener) => listener(data));
    }
  }
}

// This function will run when the page loads
window.onload = function () {
  // Add a new history entry
  history.pushState(null, document.title, location.href);

  // Listen for the popstate event which is triggered when the active history entry changes
  window.addEventListener("popstate", function (event) {
    // Push a new state to the history stack to prevent the back action
    history.pushState(null, document.title, location.href);
  });
};

let sidebarCanMove = false;
let sidebarStatic = false;
let sidebarResizeLock = false;
document.addEventListener("DOMContentLoaded", () => {
  console.log("Custom JS Loaded");

  window.alert = () => {};

  function addSidebarItems() {
    let arr = [
      "Hotel Booking",
      "Air Ticketing",
      "Tour Manage",
      "Inventory",
      "Vehicle Manage",
      "Visa Manage",
      "Customer Manage",
      "Agent Manage",
      "Employee Manage",
      "Roles & Permission",
      "Transaction",
    ];
    let index = 0;
    document
      .querySelectorAll("#kt_aside_menu .menu-icon")
      .forEach((element) => {
        element.innerHTML += `<div  style='min-width: 150px; font-size: 12px;' class='col-8 d-none alg-custom-sidebar-span px-3 py-1 mx-2 rounded-1'>${arr[index]}</div>`;
        index++;
      });
    document.querySelectorAll(".alg-custom-sidebar-span").forEach((element) => {
      element.classList.add("d-none");
    });

    // sidebar delay
    setTimeout(() => {
      document.getElementById("kt_aside").classList.add("alg-sidebar-hover");
      hoverTempLock = false;
      sidebarCanMove = true;
      if (document.getElementById("kt_aside").matches(":hover")) {
        KTCustomMain.toggleSideBar();
      }
    }, 1000);
  }
  addSidebarItems();

  const sidebarContainer = document.getElementById("kt_aside");

  document
    .getElementById("algSidebarIcon")
    .parentElement.addEventListener("click", () => {
      if (sidebarCanMove) {
        if (window.innerWidth > 992) {
          if (!sidebarStatic) {
            // sidebar out mode
            document.getElementById("kt_aside").style.width = "240px";
            document
              .getElementById("kt_aside")
              .classList.remove("alg-sidebar-hover");
            sidebarStatic = true;
          } else {
            // sidebar in mode
            document.getElementById("kt_aside").style.width = "100px";
            document
              .getElementById("kt_aside")
              .classList.add("alg-sidebar-hover");
            sidebarStatic = false;
          }
        }
      }
    });

  let hoverTempLock = true;
  function tempHoverLock() {
    hoverTempLock = true;
    setTimeout(() => {
      hoverTempLock = false;
    }, 700);
  }

  sidebarContainer.addEventListener("mouseenter", () => {
    console.log(sidebarStatic);
    if (sidebarCanMove && !sidebarStatic && !hoverTempLock) {
      if (window.innerWidth > 992) {
        KTCustomMain.toggleSideBar();
        // tempHoverLock();
      }
    }
  });

  sidebarContainer.addEventListener("mouseleave", () => {
    console.log(sidebarStatic);
    if (sidebarCanMove && !sidebarStatic && !hoverTempLock) {
      if (window.innerWidth > 992) {
        KTCustomMain.toggleSideBar();
        // tempHoverLock();
      }
    }
  });

  sidebarResizeLock = window.innerWidth < 992 ? true : false;
  window.addEventListener("resize", () => {
    if (window.innerWidth < 992) {
      this.isSidebarClosed = false;
      document
        .querySelectorAll(".alg-custom-sidebar-span")
        .forEach((element) => {
          element.classList.add("d-none");
        });
      sidebarResizeLock = true;
    } else {
      sidebarResizeLock = false;
    }
  });

  subscribers();
});

const subscribers = () => {
  // hotel add image
  KTCustomMain.EM.subscribe("hotel_add_image_change", () => {
    KTCustomMain.setPreviewImage(
      "hotelAddImagePreviewBox",
      document.getElementById("algModalPanel1AddPicture").files[0]
    );
    console.log(document.getElementById("algModalPanel1AddPicture").files[0]);
  });

  KTCustomMain.EM.subscribe("hotel_update_image_change", () => {
    KTCustomMain.setPreviewImage(
      "hotelUpdateImagePreviewBox",
      document.getElementById("algModalPanel1UpdatePicture").files[0]
    );
  });

  KTCustomMain.EM.subscribe("inventory_add_image_change", () => {
    KTCustomMain.setPreviewImage(
      "inventoryAddImagePreviewBox",
      document.getElementById("algModalPanel4AddProductImage").files[0]
    );
  });

  KTCustomMain.EM.subscribe("agent_add_image_change", () => {
    KTCustomMain.setPreviewImage(
      "agentAddImagePreviewBox",
      document.getElementById("algModalPanel8AddPicture").files[0]
    );
  });

  KTCustomMain.EM.subscribe("agent_update_image_change", () => {
    KTCustomMain.setPreviewImage(
      "agentUpdateImagePreviewBox",
      document.getElementById("algModalPanel8UpdatePicture").files[0]
    );
  });

  KTCustomMain.EM.subscribe("inventory_update_image_change", () => {
    KTCustomMain.setPreviewImage(
      "inventoryUpdateImagePreviewBox",
      document.getElementById("algModalPanel4UpdateProductImage").files[0]
    );
  });

  KTCustomMain.EM.subscribe("employee_add_image_change", () => {
    KTCustomMain.setPreviewImage(
      "employeeAddImagePreviewBox",
      document.getElementById("algModalPanel7AddAvatar").files[0]
    );
  });

  KTCustomMain.EM.subscribe("employee_update_image_change", () => {
    KTCustomMain.setPreviewImage(
      "employeeUpdateImagePreviewBox",
      document.getElementById("algModalPanel7UpdateAvatar").files[0]
    );
  });

  KTCustomMain.EM.subscribe("customer_add_image_change", () => {
    KTCustomMain.setPreviewImage(
      "customerAddImagePreviewAddBox",
      document.getElementById("algModalPanel6AddPictureInput").files[0]
    );
  });

  KTCustomMain.EM.subscribe("customer_update_image_change", () => {
    KTCustomMain.setPreviewImage(
      "customerUpdateImagePreviewUpdateBox",
      document.getElementById("algModalPanel6UpdatePictureInput").files[0]
    );
  });

  KTCustomMain.EM.subscribe("panel0_init", () => {});
};

// Class definition
var KTCustomMain = (function () {
  return {
    COMPONENT_PATH: "/components/",
    currentPanel: null,
    ROOT_URL: "http://127.0.0.1:8000",
    activeTables: [],
    EM: new EventManager(),

    init() {
      console.log("Custom JS Init");

      // $.fn.dataTable.ext.errMode = "none";
      this.panelSearch();

      this.mainNavigationInit();
      this.panelSwith("panel7"); // default panel ##defaultPanel
    },

    getMySQLDateTime() {
      const date = new Date();
      const pad = (num) => (num < 10 ? "0" : "") + num;

      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1); // Months are zero-based
      const day = pad(date.getDate());
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());
      const seconds = pad(date.getSeconds());

      return `${year}-${month}-${day} ${hours}-${minutes}-${seconds}`;
    },

    setColumnWidths(tableSelector, widths) {
      // Get the table by its ID
      const tables = document.querySelectorAll(tableSelector);
      if (!tables || !tables.length) return;

      tables.forEach((table) => {
        // Get all rows in the table
        const rows = table.rows;

        // Iterate through each column width provided
        widths.forEach((width, index) => {
          if (width) {
            // Set the width of the corresponding th element
            if (rows[0] && rows[0].cells[index]) {
              rows[0].cells[index].style.width = width;
            }

            // Set the width of the corresponding td elements
            for (let i = 1; i < rows.length; i++) {
              if (rows[i].cells[index]) {
                rows[i].cells[index].style.width = width;
              }
            }
          }
        });
      });
    },

    // vehicle types
    vehicleTypes: [
      { id: "Sedan", value: "Sedan" },
      {
        id: "SUV (Sport Utility Vehicle)",
        value: "SUV (Sport Utility Vehicle)",
      },
      { id: "Minivan", value: "Minivan" },
      { id: "Tour Bus/Coach", value: "Tour Bus/Coach" },
      { id: "Luxury Coach", value: "Luxury Coach" },
      { id: "Shuttle Bus", value: "Shuttle Bus" },
      { id: "Limousine", value: "Limousine" },
      { id: "Convertible", value: "Convertible" },
      { id: "Motorcycle", value: "Motorcycle" },
      { id: "Scooter", value: "Scooter" },
      { id: "Bicycle", value: "Bicycle" },
      { id: "ATV (All-Terrain Vehicle)", value: "ATV (All-Terrain Vehicle)" },
      {
        id: "Campervan/RV (Recreational Vehicle)",
        value: "Campervan/RV (Recreational Vehicle)",
      },
      { id: "Boat/Yacht", value: "Boat/Yacht" },
      { id: "Helicopter", value: "Helicopter" },
      { id: "Seaplane", value: "Seaplane" },
      { id: "Charter Plane", value: "Charter Plane" },
      { id: "Golf Cart", value: "Golf Cart" },
      { id: "Tuk-Tuk/Auto Rickshaw", value: "Tuk-Tuk/Auto Rickshaw" },
    ],

    // currencty
    currencies: [
      { id: "AED", value: "AED" },
      { id: "AFN", value: "AFN" },
      { id: "ALL", value: "ALL" },
      { id: "AMD", value: "AMD" },
      { id: "ANG", value: "ANG" },
      { id: "AOA", value: "AOA" },
      { id: "ARS", value: "ARS" },
      { id: "AUD", value: "AUD" },
      { id: "AWG", value: "AWG" },
      { id: "AZN", value: "AZN" },
      { id: "BAM", value: "BAM" },
      { id: "BBD", value: "BBD" },
      { id: "BDT", value: "BDT" },
      { id: "BGN", value: "BGN" },
      { id: "BHD", value: "BHD" },
      { id: "BIF", value: "BIF" },
      { id: "BMD", value: "BMD" },
      { id: "BND", value: "BND" },
      { id: "BOB", value: "BOB" },
      { id: "BRL", value: "BRL" },
      { id: "BSD", value: "BSD" },
      { id: "BTN", value: "BTN" },
      { id: "BWP", value: "BWP" },
      { id: "BYN", value: "BYN" },
      { id: "BZD", value: "BZD" },
      { id: "CAD", value: "CAD" },
      { id: "CDF", value: "CDF" },
      { id: "CHF", value: "CHF" },
      { id: "CLP", value: "CLP" },
      { id: "CNY", value: "CNY" },
      { id: "COP", value: "COP" },
      { id: "CRC", value: "CRC" },
      { id: "CUC", value: "CUC" },
      { id: "CUP", value: "CUP" },
      { id: "CVE", value: "CVE" },
      { id: "CZK", value: "CZK" },
      { id: "DJF", value: "DJF" },
      { id: "DKK", value: "DKK" },
      { id: "DOP", value: "DOP" },
      { id: "DZD", value: "DZD" },
      { id: "EGP", value: "EGP" },
      { id: "ERN", value: "ERN" },
      { id: "ETB", value: "ETB" },
      { id: "EUR", value: "EUR" },
      { id: "FJD", value: "FJD" },
      { id: "FKP", value: "FKP" },
      { id: "FOK", value: "FOK" },
      { id: "GBP", value: "GBP" },
      { id: "GEL", value: "GEL" },
      { id: "GGP", value: "GGP" },
      { id: "GHS", value: "GHS" },
      { id: "GIP", value: "GIP" },
      { id: "GMD", value: "GMD" },
      { id: "GNF", value: "GNF" },
      { id: "GTQ", value: "GTQ" },
      { id: "GYD", value: "GYD" },
      { id: "HKD", value: "HKD" },
      { id: "HNL", value: "HNL" },
      { id: "HRK", value: "HRK" },
      { id: "HTG", value: "HTG" },
      { id: "HUF", value: "HUF" },
      { id: "IDR", value: "IDR" },
      { id: "ILS", value: "ILS" },
      { id: "IMP", value: "IMP" },
      { id: "INR", value: "INR" },
      { id: "IQD", value: "IQD" },
      { id: "IRR", value: "IRR" },
      { id: "ISK", value: "ISK" },
      { id: "JEP", value: "JEP" },
      { id: "JMD", value: "JMD" },
      { id: "JOD", value: "JOD" },
      { id: "JPY", value: "JPY" },
      { id: "KES", value: "KES" },
      { id: "KGS", value: "KGS" },
      { id: "KHR", value: "KHR" },
      { id: "KID", value: "KID" },
      { id: "KMF", value: "KMF" },
      { id: "KRW", value: "KRW" },
      { id: "KWD", value: "KWD" },
      { id: "KYD", value: "KYD" },
      { id: "KZT", value: "KZT" },
      { id: "LAK", value: "LAK" },
      { id: "LBP", value: "LBP" },
      { id: "LKR", value: "LKR" },
      { id: "LRD", value: "LRD" },
      { id: "LSL", value: "LSL" },
      { id: "LYD", value: "LYD" },
      { id: "MAD", value: "MAD" },
      { id: "MDL", value: "MDL" },
      { id: "MGA", value: "MGA" },
      { id: "MKD", value: "MKD" },
      { id: "MMK", value: "MMK" },
      { id: "MNT", value: "MNT" },
      { id: "MOP", value: "MOP" },
      { id: "MRU", value: "MRU" },
      { id: "MRW", value: "MRW" },
      { id: "MUR", value: "MUR" },
      { id: "MVR", value: "MVR" },
      { id: "MWK", value: "MWK" },
      { id: "MXN", value: "MXN" },
      { id: "MYR", value: "MYR" },
      { id: "MZN", value: "MZN" },
      { id: "NAD", value: "NAD" },
      { id: "NGN", value: "NGN" },
      { id: "NIO", value: "NIO" },
      { id: "NOK", value: "NOK" },
      { id: "NPR", value: "NPR" },
      { id: "NZD", value: "NZD" },
      { id: "OMR", value: "OMR" },
      { id: "PAB", value: "PAB" },
      { id: "PEN", value: "PEN" },
      { id: "PGK", value: "PGK" },
      { id: "PHP", value: "PHP" },
      { id: "PKR", value: "PKR" },
      { id: "PLN", value: "PLN" },
      { id: "PYG", value: "PYG" },
      { id: "QAR", value: "QAR" },
      { id: "RON", value: "RON" },
      { id: "RSD", value: "RSD" },
      { id: "RUB", value: "RUB" },
      { id: "RWF", value: "RWF" },
      { id: "SAR", value: "SAR" },
      { id: "SBD", value: "SBD" },
      { id: "SCR", value: "SCR" },
      { id: "SDG", value: "SDG" },
      { id: "SEK", value: "SEK" },
      { id: "SGD", value: "SGD" },
      { id: "SHP", value: "SHP" },
      { id: "SLL", value: "SLL" },
      { id: "SOS", value: "SOS" },
      { id: "SRD", value: "SRD" },
      { id: "SSP", value: "SSP" },
      { id: "STN", value: "STN" },
      { id: "SYP", value: "SYP" },
      { id: "SZL", value: "SZL" },
      { id: "THB", value: "THB" },
      { id: "TJS", value: "TJS" },
      { id: "TMT", value: "TMT" },
      { id: "TND", value: "TND" },
      { id: "TOP", value: "TOP" },
      { id: "TRY", value: "TRY" },
      { id: "TTD", value: "TTD" },
      { id: "TVD", value: "TVD" },
      { id: "TWD", value: "TWD" },
      { id: "TZS", value: "TZS" },
      { id: "UAH", value: "UAH" },
      { id: "UGX", value: "UGX" },
      { id: "USD", value: "USD" },
      { id: "UYU", value: "UYU" },
      { id: "UZS", value: "UZS" },
      { id: "VES", value: "VES" },
      { id: "VND", value: "VND" },
      { id: "VUV", value: "VUV" },
      { id: "WST", value: "WST" },
      { id: "XAF", value: "XAF" },
      { id: "XCD", value: "XCD" },
      { id: "XDR", value: "XDR" },
      { id: "XOF", value: "XOF" },
      { id: "XPF", value: "XPF" },
      { id: "YER", value: "YER" },
      { id: "ZAR", value: "ZAR" },
      { id: "ZMW", value: "ZMW" },
      { id: "ZWL", value: "ZWL" },
    ],

    showLoadingToast(message, color = "gray") {
      const toastHTML = `
          <div class="d-flex py-2 px-4 align-items-center gap-3  toast position-fixed bottom-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true" style="background-color: ${color}; z-index: 2000">
            <div class="spinner-border text-light" role="status" style="width: 1.5rem; height: 1.5rem;"></div>
            <div class="toast-body text-white">
                ${message}
            </div>
          </div>
      `;

      const toastContainer = document.createElement("div");
      toastContainer.innerHTML = toastHTML;
      document.body.appendChild(toastContainer);

      const toastElement = toastContainer.querySelector(".toast");
      const toast = new bootstrap.Toast(toastElement, { delay: 700 });
      toast.show();
    },

    panelSearch() {
      const container = document.getElementById("seachResultsContainer");
      console.log("test");

      const panelsList = [
        {
          name: "panel0",
          title: "Dashboard",
        },
        {
          name: "panel1",
          title: "Hotel Booking",
        },
        {
          name: "panel2",
          title: "Air Ticketing",
        },
        {
          name: "panel3",
          title: "Tour Management",
        },
        {
          name: "panel4",
          title: "Inventory",
        },
        {
          name: "panel11",
          title: "Vechile Management",
        },
        {
          name: "panel5",
          title: "Visa Manage",
        },
        {
          name: "panel6",
          title: "Customer Manage",
        },
        {
          name: "panel8",
          title: "Agent Manage",
        },
        {
          name: "panel7",
          title: "Employee Manage",
        },
        {
          name: "panel9",
          title: "Roles & Permission",
        },
        {
          name: "panel12",
          title: "Transaction",
        },
      ];

      function loadSearchResult(array) {
        container.innerHTML = "";
        array.forEach((element) => {
          container.innerHTML += `
                            <div class="d-flex align-items-center mb-5">
                              <div class="d-flex flex-column">
                                <a
                                  onclick="KTCustomMain.panelSwith('${element.name}')"
                                  href="#"
                                  class="fs-6 text-gray-800 text-hover-primary fw-semibold">${element.title}</a>
                              </div>
                            </div>`;
        });
      }

      let results = [];
      document
        .getElementById("mainSearchBar")
        .addEventListener("keydown", (event) => {
          console.log(event.target.value);
          results = [];

          panelsList.forEach((search) => {
            const lowerCased = search.title.toLowerCase();
            if (lowerCased.includes(event.target.value.toLowerCase())) {
              results.push(search);
            }
          });

          loadSearchResult(results);
        });
    },

    /**
     *
     * @param {string} inputElementId - input id
     * @param {string} imageElementId - image preview img id
     */
    updateImagePreview(inputElementId, imageElementId, callback = () => {}) {
      const inputElement = document.getElementById(inputElementId);
      const imageElement = document.getElementById(imageElementId);
      const file = inputElement.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imageElement.src = e.target.result;
          callback(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },

    objectToQueryParams(params) {
      return Object.keys(params)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
        )
        .join("&");
    },

    async fetchData(
      url,
      options,
      showError = false,
      isJson = true,
      callback = null
    ) {
      const response = await fetch(url, options);

      if (!response.ok) {
        if (showError) {
          // this.showToast("Something Went Wrong! Code : 1010");
          console.log(response);
        }
        return false;
      }

      let data = null;
      if (isJson) {
        try {
          data = await response.json();
        } catch (error) {
          if (showError) {
            this.showToast("Invalid Response Format!");
          }
          return false;
        }
      } else {
        data = await response.text();
      }
      if (callback !== null) {
        return callback(data);
      } else {
        console.log(data);
        if (!isJson) {
          return data;
        } else {
          if (data.status == "success") {
            if (data.results) {
              return data.results;
            } else {
              if (showError) {
                this.showToast("success", true);
              }
            }
          } else if (data.status == "failed") {
            if (showError) {
              this.showToast(data.error);
            }
            return false;
          } else {
            if (showError) {
              this.showToast("Server Error!");
            }
            return false;
          }
        }
      }
    },

    closeAllModals() {
      const elements = document.querySelectorAll(
        '[data-bs-dismiss="modal"][data-customclosemodal]'
      );
      elements.forEach((element) => {
        element.click();
      });
    },

    // toggle side bar
    isSidebarClosed: true,
    toggleSideBar() {
      if (!sidebarCanMove) {
        return;
      }

      // const kt_aside = document.getElementById("kt_aside");
      const sidebarSlide = () => {
        // kt_aside.style.width = this.isSidebarClosed ? "240px" : "max-content";
        this.isSidebarClosed = !this.isSidebarClosed;

        document
          .querySelectorAll(".alg-custom-sidebar-span")
          .forEach((element) => {
            element.classList.toggle("d-none");
          });

        // document
        //   .getElementById("algSidebarIcon")
        //   .style.rotate = "0deg"

        // document
        //   .getElementById("algSidebarIcon")
        //   .style.rotate = "180deg";
      };

      if (this.isSidebarClosed) {
        setTimeout(() => {
          sidebarSlide();
        }, 200);
      } else {
        setTimeout(() => {
          sidebarSlide();
        }, 0);
      }
    },

    // show toaest message
    showToast(message, isGreen = false) {
      const toastContainer = document.getElementById("toast-container");

      function getCurrentTimeInSeconds() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
      }

      let nowTime = getCurrentTimeInSeconds();

      let toast = `
            <div class="my-2 toast show text-black border-2 ${
              isGreen ? " border-success " : "border-danger"
            }" role="alert" aria-live="assertive" aria-atomic="true" style="background-color: ${
        isGreen ? " #daffd9 " : " #ffcccc "
      } ;">
                <div class="toast-header bg-transparent">
                    <div class="pe-3">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.3" d="M9.00001 17.3333C13.6024 17.3333 17.3333 13.6023 17.3333 8.99996C17.3333 4.39759 13.6024 0.666626 9.00001 0.666626C4.39763 0.666626 0.666672 4.39759 0.666672 8.99996C0.666672 13.6023 4.39763 17.3333 9.00001 17.3333Z" fill="#5E6278"/>
                        <path d="M9 10.1666C9.22102 10.1666 9.43298 10.0788 9.58926 9.9225C9.74554 9.76622 9.83334 9.55426 9.83334 9.33324V5.44991C9.83334 5.2289 9.74554 5.01694 9.58926 4.86065C9.43298 4.70437 9.22102 4.61658 9 4.61658C8.77899 4.61658 8.56703 4.70437 8.41075 4.86065C8.25447 5.01694 8.16667 5.2289 8.16667 5.44991V9.33324C8.16667 9.55426 8.25447 9.76622 8.41075 9.9225C8.56703 10.0788 8.77899 10.1666 9 10.1666Z" fill="#5E6278"/>
                        <path d="M9.00001 13.3833C9.57531 13.3833 10.0417 12.9169 10.0417 12.3416C10.0417 11.7663 9.57531 11.2999 9.00001 11.2999C8.42471 11.2999 7.95834 11.7663 7.95834 12.3416C7.95834 12.9169 8.42471 13.3833 9.00001 13.3833Z" fill="#5E6278"/>
                      </svg>
                    </div>
                    <strong class="me-auto">${
                      isGreen ? "Success" : "Alert"
                    }</strong>
                    <small>${nowTime}</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                  ${message}
                </div>
            </div>
      `;
      const wrapperDiv = document.createElement("div");
      wrapperDiv.innerHTML = toast;
      toast = wrapperDiv.firstElementChild;

      if (!toast) {
        return;
      }

      toastContainer.appendChild(toast);
      setTimeout(() => toast.classList.add("show"), 10);

      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toastContainer.removeChild(toast), 500);
      }, 3000);
    },

    /**
     * Clear all input elements within a given container and reset them to default values if specified.
     * @param {HTMLElement} container - The container element that holds the input elements.
     */
    resetInputsToDefault(container) {
      const inputs = container.querySelectorAll("input, select, textarea");

      inputs.forEach((input) => {
        switch (input.type) {
          case "checkbox":
          case "radio":
            input.checked = input.defaultChecked;
            break;
          case "select-one":
          case "select-multiple":
            Array.from(input.options).forEach((option) => {
              option.selected = option.defaultSelected;
            });
            break;
          case "textarea":
          case "text":
          case "password":
          case "email":
          case "number":
          case "tel":
          case "url":
          case "range":
          case "date":
          case "month":
          case "week":
          case "time":
          case "datetime-local":
          case "search":
          case "color":
            input.value = input.defaultValue;
            break;
          default:
            input.value = "";
        }
      });
    },

    /**
     *
     * @param {string} id - input group container id
     * @param {object} data - data list of objects
     *
     * @description - this is used to fill entire input group based on the name of the input elements. here input, textares and select element can be filled with values based on the name of element
     *
     * @version 1.0.0
     *
     */
    fillInputs(id, data, addSelected = true) {
      const viewContainer = document.getElementById(id);
      viewContainer.querySelectorAll("input").forEach((element) => {
        if (
          ["text", "email", "number", "date", "time"].includes(element.type)
        ) {
          this.getNameNotation(data, element, addSelected);
        }
      });

      viewContainer.querySelectorAll("textarea").forEach((element) => {
        this.getNameNotation(data, element, addSelected);
      });
    },

    /**
     * get input data values
     */
    getInputValues(id) {
      const inputs = {};
      const inputContainer = document.getElementById(id);
      ["input", "select", "textarea"].forEach((element) => {
        inputContainer.querySelectorAll(element).forEach((inputItem) => {
          // if (!element.dataset.ignore) {
          inputs[inputItem.name] = inputItem.value;
          // }
        });
      });

      return inputs;
    },

    // images inputs

    imageSelector(
      idIndex,
      array,
      maxFiles = 1,
      classess = "alg-default-input-image-preview"
    ) {
      const instance = this;

      const dropArea = document.getElementById("dropArea" + idIndex);
      const fileInput = document.getElementById("fileInput" + idIndex);

      if (!fileInput || !dropArea) {
        return;
      }

      dropArea.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropArea.classList.add("dragover");
      });

      dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("dragover");
      });

      dropArea.addEventListener("drop", (event) => {
        event.preventDefault();
        dropArea.classList.remove("dragover");
        const files = event.dataTransfer.files;
        if (files.length > 0) {
          handleFiles(files);
        }
      });

      dropArea.addEventListener("click", () => {
        fileInput.click();
      });

      fileInput.addEventListener("change", (event) => {
        const files = event.target.files;
        if (files.length > 0) {
          handleFiles(files);
        }
      });

      function handleFiles(files) {
        const file = files[0];
        if (file && file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (array.length >= maxFiles) {
              return;
            }
            array.push(event.target.result);
            instance.appendImages(
              "imagePreviewBox" + idIndex,
              array,
              maxFiles,
              classess
            );

            console.log(array.length);
          };
          reader.readAsDataURL(file);
        } else {
          this.showToast("Please drop an image file.");
        }
      }
    },

    appendImages(
      containerId,
      imageUrls,
      maxFiles = 1,
      classes = "alg-default-input-image-preview"
    ) {
      // Ensure the function does not modify external state
      const container = document.getElementById(containerId);
      if (!container) return;

      // Clear existing images in the container
      container.innerHTML = "";

      // Append each image with the icon to the container
      imageUrls.forEach((url, index) => {
        if (index < maxFiles) {
          // Create the container for each image and icon
          const imageWrapper = document.createElement("div");
          imageWrapper.classList.add("image-container");

          // Create the image element
          const img = document.createElement("img");
          img.src = url;
          img.classList.add(classes);
          imageWrapper.appendChild(img);

          // Create the icon element
          const icon = document.createElement("i");
          icon.classList.add("bi", "bi-x-circle-fill", "remove-icon");
          icon.addEventListener("click", () => {
            // Remove the element from the DOM
            container.removeChild(imageWrapper);

            // Remove the element from the array
            imageUrls.splice(index, 1);

            // Re-render the images to update the indices
            this.appendImages(containerId, imageUrls, maxFiles);
          });
          imageWrapper.appendChild(icon);

          // Append the image wrapper to the container
          container.appendChild(imageWrapper);
        }
      });
    },

    // data URL to image file
    async convertDataUrlsToFileObjects(dataUrls) {
      async function dataUrlToFile(dataUrl, index) {
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const fileName = `image${index + 1}.png`;
        return new File([blob], fileName, { type: blob.type });
      }

      const filePromises = dataUrls.map((dataUrl, index) =>
        dataUrlToFile(dataUrl, index)
      );

      return await Promise.all(filePromises);
    },

    /**
     *create a form data object from js object
     *
     * @param {object} data - object of data to be used as data
     * @returns {FormData} - form data object
     */
    createFormDataFromObject(data) {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      return formData;
    },

    async addDataToServer(URI, formData, modalContainerId, switchPanel = null) {
      await fetch(`${this.ROOT_URL}${URI}`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "success") {
            this.showToast("Success", true);
            this.resetInputsToDefault(
              document.getElementById(modalContainerId)
            );

            if (switchPanel) {
              this.closeAllModals();
              this.panelSwith(switchPanel);
            }
          } else if (data.status == "failed") {
            this.showToast(data.error);
          } else {
            this.showToast("Failed");
            console.log(data);
          }

          return data;
        });
    },

    /**
     * udpate a selector
     *
     * @param {string} id - selector id
     * @param {Array} data  - array of object contianing data
     */
    setSelectorOptions(
      id,
      data,
      selected,
      elementId = "id",
      elementName = "full_name"
    ) {
      const selector = document.getElementById(id);
      selector.innerHTML = "";
      selector.innerHTML += `<option value="0" selected>Select</option>`;
      data.forEach((element) => {
        selector.innerHTML += `<option value="${element[elementId]}" ${
          element[elementId] === selected ? " selected " : ""
        }>${element[elementName]}</option>`;
      });
    },

    /**
     * update UI sector with server data
     *
     * @param {string} id  - selector id
     * @param {string} URI - URI of the data api from the server
     */
    async updateSelectorWithServerData(
      id,
      URI,
      selected = 0,
      elementId = "id",
      elementName = "full_name"
    ) {
      const data = await this.fetchData(`${this.ROOT_URL}${URI}`);
      this.setSelectorOptions(id, data, selected, elementId, elementName);
    },

    /**
     * set image to preview placeholder
     */
    setPreviewImage(id, imageFile) {
      if (!(imageFile instanceof Blob)) {
        return;
      }

      const element = document.getElementById(id);
      if (!element) return;

      // document.getElementById(id).classList.remove("alg-hotel-pv");
      // document.getElementById(id).classList.remove("alg-inventory-pv");
      // document.getElementById(id).classList.remove("alg-employee-pv");
      // document.getElementById(id).classList.remove("alg-customer-pv");
      // document.getElementById(id).classList.remove("alg-agent-pv");
      // document.getElementById(id).classList.remove("alg-vehicles-pv");
      // document.getElementById(id).classList.remove("alg-nic-pv");
      // document.getElementById(id).classList.remove("alg-lic-pv");
      // document.getElementById(id).classList.remove("alg-ins-pv");

      const reader = new FileReader();

      reader.onload = function (event) {
        const imageUrl = event.target.result;
        if (element.tagName.toLowerCase() === "img") {
          element.src = imageUrl;
        } else {
          element.style.backgroundImage = `url(${imageUrl}) !important`;
        }
      };

      reader.readAsDataURL(imageFile);
    },

    getNameNotation(data, element, addSelected) {
      let extractedData = data;
      element.name.split(".").forEach((part) => {
        extractedData = extractedData[part];
      });

      element.value = extractedData;

      if (addSelected) {
        element.disabled = true;
      }
    },

    // custom - table search bar switch
    tableSearchSwitch(table) {
      const searchContainer = document.querySelector(
        `.alg-${table}-search-container`
      );
      const search = document.querySelector(
        `.alg-${table}-container input[type="search"]`
      );
      search.placeholder = "🔎︎ Search";
      searchContainer.appendChild(search);
    },

    // tableFooterSwitch(table, number) {
    //   const footerContainer = document.querySelector(
    //     `.alg-${table}-footer-container`
    //   );
    //   footerContainer.appendChild(footer);

    //   // const footer = document.querySelector(
    //   //   `#DataTables_Table_${number}_wrapper .dt-paging`
    //   // );
    // },

    // navigation initiator
    mainNavigationInit() {
      document.querySelectorAll(".alg-main-navigation").forEach((element) => {
        element.addEventListener("click", () => {
          const panel = element.dataset.panel;
          this.panelSwith(panel);
        });
      });
    },

    // navigatoin button effect
    navigationBtnChange(panel) {
      document
        .querySelectorAll(".alg-main-navigation-container .menu-item")
        .forEach((element) => {
          element.classList.remove("show", "alg-navigation-active");
          if (element.dataset.panel == panel) {
            element.classList.add("show", "alg-navigation-active");
          }
        });
    },

    setPanelGreet(panel) {
      function greetMessage() {
        let greet = "";
        let today = new Date();
        let curHr = today.getHours();
        if (curHr < 12) {
          greet = "Good Morning";
        } else if (curHr < 18) {
          greet = "Good Afternoon";
        } else {
          greet = "Good Evening";
        }
        const username = document.body.dataset.username ?? "";

        return greet + username;
      }

      const greet = [
        {
          panel: "panel0",
          title: "Dashboard",
          greet: greetMessage(),
        },
        {
          panel: "panel1",
          title: "Hotel Booking",
          greet: "Manage your hotel booking",
        },
        {
          panel: "panel2",
          title: "Air Ticketing",
          greet: "Manage your Air Ticketing",
        },
        {
          panel: "panel3",
          title: "Tour Manage",
          greet: "Manage your tours",
        },
        {
          panel: "panel4",
          title: "Inventory",
          greet: "Manage your inventory",
        },
        {
          panel: "panel11",
          title: "Vechicle",
          greet: "Manage your vechicles",
        },
        {
          panel: "panel5",
          title: "Visa Manage",
          greet: "Manage your visa submissions",
        },
        {
          panel: "panel6",
          title: "Customer Manage",
          greet: "Manage your customers",
        },
        {
          panel: "panel12",
          title: "Transaction Manage",
          greet: "Manage your transactions",
        },
        {
          panel: "panel8",
          title: "Agent Management",
          greet: "Manage your agents",
        },
        {
          panel: "panel10",
          title: "Profile Management",
          greet: "Manage your profile",
        },
        {
          panel: "panel9",
          title: "Permission & Role Management",
          greet: "Manage your permission & role",
        },
        {
          panel: "panel7",
          title: "Emplyee Management",
          greet: "Manage your employees",
        },
      ];

      greet.forEach((element) => {
        if (element.panel === panel) {
          document.getElementById("panelTitleSpan").innerText = element.title;
          document.getElementById("greetingMessageSpan").innerText =
            element.greet;
        }
      });
    },

    panelsNames: [
      {
        panel: "panel0",
        title: "Dashboard",
        greet: "",
      },
      {
        panel: "panel1",
        title: "Hotel Booking",
        greet: "Manage your hotel booking",
      },
      {
        panel: "panel2",
        title: "Air Ticketing",
        greet: "Manage your air ticketing",
      },
      {
        panel: "panel3",
        title: "Tour Manage",
        greet: "Manage your tour manage",
      },
      {
        panel: "panel4",
        title: "Inventory",
        greet: "Manage your inventory",
      },
      {
        panel: "panel11",
        title: "Vechicle",
        greet: "Manage your vechicle",
      },
      {
        panel: "panel5",
        title: "Visa Management",
        greet: "Manage your visa submission",
      },
      {
        panel: "panel6",
        title: "Customer Management",
        greet: "Manage your customers",
      },
      {
        panel: "panel12",
        title: "Transaction Management",
        greet: "Manage your transactions",
      },
      {
        panel: "panel8",
        title: "Agent Management",
        greet: "Manage your agents",
      },
      {
        panel: "panel10",
        title: "Profile Management",
        greet: "Manage your profile",
      },
      {
        panel: "panel9",
        title: "Permission & Role Management",
        greet: "Manage your permission & role",
      },
      {
        panel: "panel7",
        title: "Emplyee Management",
        greet: "Manage your employees",
      },
    ],

    /**
     * get and set recently visited panels
     *
     * @param {string} panel - panel name
     */
    recentPanelDataUpdate(panel) {
      let recent = [];

      if (localStorage.getItem("recent") === null) {
        localStorage.setItem("recent", JSON.stringify([]));
      }

      recent = JSON.parse(localStorage.getItem("recent"));

      let isAlreadyExists = false;
      recent.forEach((element) => {
        if (element.panel === panel) {
          isAlreadyExists = true;
        }
      });

      if (!isAlreadyExists) {
        recent.unshift(panel);
      }

      if (recent.length > 3) {
        recent.splice(3);
      }

      recent = Array.from(new Set(recent));
      localStorage.setItem("recent", JSON.stringify(recent));
    },

    /**
     * get the recently visited panels from local storage
     */
    getRecentPanels() {
      return JSON.parse(localStorage.getItem("recent") ?? "[]");
    },

    /**
     * @param {String} panel - panel name Ex: if file is panel1.comp.html -> panel name is panel1
     * @returns {boolean|string}
     *
     * replace the panel container with html code from server
     */
    panelIsJustOpened: false,
    async panelSwith(panel) {
      this.showLoadingToast("Loading...");

      // panel opening delay
      if (this.panelIsJustOpened) {
        return;
      }
      this.panelIsJustOpened = true;
      setTimeout(() => {
        this.panelIsJustOpened = false;
      }, 1500);

      this.setPanelGreet(panel);

      // reslease search
      const searchbar = document.getElementById("mainSearchBar");
      searchbar.value = "";
      document.getElementById("panelTitleSpan").click();

      // add to recent panels
      this.panelsNames.forEach((element) => {
        if (element.panel === panel && panel !== "panel0") {
          this.recentPanelDataUpdate(element);
          console.log(this.getRecentPanels());
        }
      });

      const defaultDaterange = "2000-01-01 - 2099-12-31";
      this.visaSearchDateRange = defaultDaterange;
      this.agentSearchDateRange = defaultDaterange;
      this.hotelsSearchDateRange = defaultDaterange;
      this.vahicleManageDataRange = defaultDaterange;
      this.inventorySearchDateRange = defaultDaterange;
      this.tourManageSearchDateRange = defaultDaterange;
      this.transactionManageBankDateRange = defaultDaterange;
      this.transactionManageDrawerDateRange = defaultDaterange;

      const panelContainer = document.querySelector(".alg-panel-container");
      this.panelContainer = panelContainer;

      const request = await fetch(
        `${this.COMPONENT_PATH}${panel ?? "panel1"}.comp.html`
      );

      if (!request.ok) {
        panelContainer.innerHTML = "Something Went Wrong! Code : 1020";
        return false;
      }

      panelContainer.innerHTML = await request.text();
      this.EM.emit("table_destroy"); // emit table destroy event
      this[panel + "Init"](panelContainer); //  call relevant panel initiator
      console.log("Panel " + panel + " initiated");
      this.navigationBtnChange(panel);
      return true;
    },

    /**
     * create and open a bootstrap modal
     *
     * @param {string} selector - selector to the modal
     *
     * @returns - return the modal
     */
    async openModel(selector) {
      const modal = new bootstrap.Modal(selector);
      modal.show();
      return modal;
    },

    // export
    exportXlsx(uri, fileName = "datafile", tableName) {
      if (!tableName) {
        return;
      }

      let queryParam = "";
      if (
        this[tableName + "SlectedRowData"] &&
        this[tableName + "SlectedRowData"].length
      ) {
        queryParam += `?selected=${JSON.stringify(
          this[tableName + "SlectedRowData"]
        )}`;
      }

      console.log(queryParam);

      fetch(`${this.ROOT_URL}${uri}${queryParam}`, {
        method: "POST",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          return response.blob();
        })
        .then((blob) => {
          // Create a new Blob object using the response data
          console.log(blob);
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${fileName}-${this.getMySQLDateTime()}.xlsx`;
          document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
          a.click();
          a.remove(); //afterwards we remove the element again
        })
        .catch((e) => {
          console.error("An error occurred while fetching the data: ", e);
        });
    },

    printCurrentLine() {
      const error = new Error();
      console.error(error);
    },

    setSelectedRowInTable(event, tableName, id) {
      const elements = document.querySelectorAll(
        "[data-tableitemselectAllCheck]"
      );
      elements.forEach((element) => {
        element.checked = false;
      });

      const isSelected = event.target.checked;
      if (isSelected) {
        this[tableName + "SlectedRowData"].push(id);
      } else {
        let index = this[tableName + "SlectedRowData"].indexOf(id);
        if (index > -1) {
          this[tableName + "SlectedRowData"].splice(index, 1);
        }
      }

      console.log(this[tableName + "SlectedRowData"]);
    },

    resetSelectedTableCeckBox(event, tableName) {
      if (!event.target.checked) {
        return;
      }

      this[tableName + "SlectedRowData"] = [];
      const elements = document.querySelectorAll("[data-tableitemselect]");
      elements.forEach((element) => {
        element.checked = false;
      });
    },

    //
    //
    //
    // ---------------------------------------------------------- panel 1 - hotel
    //
    //
    //

    hotelsSearchDateRange: "2000-01-01 - 2099-12-31",
    hotelTableSlectedRowData: [],
    async panel1Init(container) {
      const app = this;
      app.activeTables = [];

      let table = null;

      async function tableInit() {
        let dateRangeParam = "&date_range=" + app.hotelsSearchDateRange;

        // load data
        const data = await app.fetchData(
          `${app.ROOT_URL}/api/hotel?selected=true${dateRangeParam}`,
          {}
        );

        // thigns to do on any data update
        document.getElementById("hotelTotalCountSpan").innerText = data.length;

        if (table) {
          table.rows().remove();
          table.rows.add(data).draw();
          return;
        }

        app.activeTables.forEach((element) => {
          if (element.name === "hotel_add_1") {
            return;
          }
        });

        table = new DataTable(".alg-panel1-table1", {
          data: data,
          columns: [
            { title: "SELECT" },
            { data: "booking_date", title: "DATE" },
            { data: "hotel_name", title: "HOTEL NAME" },
            { data: "customer_first_name", title: "CUSTOMER" },
            { data: "address", title: "ADDRESS" },
            { data: "price", title: "PRICE" },
            { data: "rooms", title: "ROOM" },
            { data: "contact", title: "CONTACT" },
            { data: "rating", title: "RATING" },
            { title: "STATUS" },
            { title: "ACTION" },
          ],

          lengthChange: false,
          info: false,
          autoWidth: true,
          stateSave: true,

          fixedHeader: {
            header: true,
          },
          scrollX: true,

          language: {
            // Customization for text
            lengthMenu: "Show _MENU_ entries",
            infoFiltered: "(filtered from _MAX_ total entries)",
            search: "",
          },

          columnDefs: [
            {
              render: function (data, type, row) {
                return `<input type="checkbox" class="form-check" data-tableitemselect onchange="KTCustomMain.setSelectedRowInTable(event, 'hotelTable', ${row.id})" />`;
              },
              targets: 0,
            },
            {
              render: function (data, type, row) {
                return `<div class="ms-2 bg-secondary badge rounded-1 fw-semibold">${row.status}</div>`;

                // return `<select class="alg-table-selector ms-2 badge rounded-1 fw-semibold" data-id="${
                //   row.id
                // }" onchange="KTCustomMain.updateHotelStatus(event)">
                //           <option class="px-1" value="1" ${
                //             row.status == "Confirmed" ? " selected " : ""
                //           } >Confirmed </option>
                //           <option class="px-1" value="2" ${
                //             row.status == "Pending" ? " selected " : ""
                //           } >Pending </option>
                //           <option class="px-1" value="3" ${
                //             row.status == "Cancelled" ? " selected " : ""
                //           } >Cancelled</option>
                //         </select>`;
              },
              targets: 9,
            },
            {
              render: function (data, type, row) {
                return `<select data-id="${row.id}" data-hotel_name="${row.hotel_name}" class="for alg-table-selector ms-2 badge rounded-1 fw-semibold" onchange="KTCustomMain.panelAction(event)">
                          <option class="px-1" value="defaultAction">Select</option>
                          <option class="px-1" value="hotelEditModel">Edit</option>
                          <option class="px-1" value="hotelViewModel">View</option>
                          <option class="px-1" value="hotelDeleteModel">Delete</option>
                        </select>`;
              },
              targets: 10,
            },
          ],
        });
        app.tableSearchSwitch("panel1-table1");
        // app.tableFooterSwitch("panel1-table1", 0);

        app.activeTables.push({
          name: "hotel_add_1",
          table: table,
        });
      }

      await tableInit();
      app.EM.subscribe("table_destroy", () => {
        app.activeTables.forEach((element) => {
          element.table.destroy();
        });
      });

      // date picker
      // Initialize the date range picker
      $(function () {
        // Initialize the date range picker
        $("#dateRangeInput").daterangepicker(
          {
            opens: "center",
            autoUpdateInput: false,
          },
          function (start, end, label) {
            // Update the display button text with the selected date range
            $("#displayRangeButton").text(
              start.format("MMM D") + " - " + end.format("MMM D")
            );

            app.hotelsSearchDateRange =
              start.format("YYYY-MM-DD") + " - " + end.format("YYYY-MM-DD");
            tableInit(app);
          }
        );
      });
    },

    // hotel add UI data update
    async hotelAddModalUIUpdate() {
      // customer selector
      this.updateSelectorWithServerData(
        "algModalPanel1AddCustomer",
        `/api/customer`
      );

      // country selector
      this.updateSelectorWithServerData(
        "algModalPanel1AddCountry",
        "/api/country",
        0,
        "id",
        "country"
      );

      // set default currencty
      this.setSelectorOptions(
        "algModalPanel1AddCurrency",
        this.currencies,
        0,
        "id",
        "value"
      );
    },

    panelAction(event) {
      this[event.target.value](event);
    },

    defaultAction(event) {
      event.target.value = "defaultAction";
      return;
    },

    updateHotelSelectedHotelId: null,
    /**
     * open hotel data edit modal
     *
     * @param {object} event - browser event object
     */
    async hotelEditModel(event) {
      this.openModel("#algModalPanel1Update");
      this.updateHotelSelectedHotelId = event.target.dataset.id;

      const data = await this.fetchData(
        `${this.ROOT_URL}/api/hotel?id=${event.target.dataset.id}`
      );

      this.fillInputs("algModalPanel1Update", data, false);
      await this.hotelUpdateModalUIUpdate(
        data.customers_id,
        data.country_id,
        data.currency
      );
      document.getElementById(
        "hotelUpdateImagePreviewBox"
      ).style.backgroundImage = `url('${this.ROOT_URL}/assets/images/hotel/${data.hotel_image}')`;
      document.getElementById("algModalPanel1UpdateCustomer").value =
        data.customers_id;

      this.defaultAction(event);
    },

    // hotel update UI data update
    async hotelUpdateModalUIUpdate(customer, country, currency) {
      // customer selector
      this.updateSelectorWithServerData(
        "algModalPanel1UpdateCustomer",
        `/api/customer`,
        customer
      );

      // country selector
      this.updateSelectorWithServerData(
        "algModalPanel1UpdateCountry",
        "/api/country",
        country,
        "id",
        "country"
      );

      // set default currencty
      this.setSelectorOptions(
        "algModalPanel1UpdateCurrency",
        this.currencies,
        currency,
        "id",
        "value"
      );
    },

    /**
     * open the hotel view modal
     *
     * @param {object} event - browser events
     *
     */
    async hotelViewModel(event) {
      this.openModel("#algModalPanel1View");

      const data = await this.fetchData(
        `${this.ROOT_URL}/api/hotel?id=${event.target.dataset.id}`
      );
      this.fillInputs("algModalPanel1View", data);

      document.getElementById(
        "algModalPanel1ViewPicture"
      ).style.backgroundImage = `url('${this.ROOT_URL}/assets/images/hotel/${data.hotel_image}')`;

      this.defaultAction(event);
    },

    /**
     * open hotel delete modal
     *
     * @param {object} event  - browser event
     */
    hotelDeleteModel(event) {
      this.openModel("#algModalPanel1Delete");

      const dataset = event.target.dataset;
      this.fillInputs("panel1DeleteInputGroup", {
        id: dataset.id,
        hotel_name: dataset.hotel_name,
      });

      this.defaultAction(event);
    },

    // panel 1 actions
    // hotel adding
    async addBooking() {
      const inputs = this.getInputValues("panel1AddInputGroup");
      console.log(inputs);

      const formData = this.createFormDataFromObject(inputs);
      formData.append("image", algModalPanel1AddPicture.files[0]);
      this.addDataToServer(
        `/api/hotel/add`,
        formData,
        "panel1AddInputGroup",
        "panel1"
      );
    },

    // udpate booking
    updateBooking() {
      const inputs = this.getInputValues("panel1UpdateInputGroup");
      const id = this.updateHotelSelectedHotelId;

      console.log(inputs);
      console.log(id);

      const formData = this.createFormDataFromObject(inputs);
      formData.append("id", id);
      formData.append(
        "image",
        document.getElementById("algModalPanel1UpdatePicture").files[0]
      );

      fetch(`${this.ROOT_URL}/api/hotel/update`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "success") {
            this.showToast("Successfully updated", true);
            this.closeAllModals();
            this.panelSwith("panel1");
          } else if (data.status == "failed") {
            this.showToast(data.error);
          } else {
            console.log(data);
          }
        });
    },

    //delte hotel
    deleteHotel() {
      const form = new FormData();
      form.append(
        "id",
        document.getElementById("panel1HotelDeleteModalId").value
      );

      this.fetchData(
        `${this.ROOT_URL}/api/hotel/delete`,
        {
          method: "POST",
          body: form,
        },
        true
      );

      this.panelSwith("panel1");
    },

    //  update modal status
    updateHotelStatus(event) {
      const form = new FormData();
      form.append("id", event.target.dataset.id);
      form.append("status", event.target.value);

      this.fetchData(
        `${this.ROOT_URL}/api/hotel/changeStatus`,
        {
          method: "POST",
          body: form,
        },
        true,
        true,
        (data) => {}
      );
    },

    //
    //
    //
    // ---------------------------------------------------------- panel 2 - air ticket
    //
    //
    //

    // panel 2
    airTableSlectedRowData: [],
    async panel2Init() {
      const app = this;
      app.activeTables = [];

      let table = null;

      async function tableInit() {
        let dateRangeParam = "date_range=" + app.tourManageSearchDateRange;

        // load data
        const data = await app.fetchData(
          `${app.ROOT_URL}/api/air?${dateRangeParam}`,
          {}
        );

        console.log(data);

        // thigns to do on any data update
        document.getElementById("airTicketTotalCountSpan").innerText =
          data.length;

        if (table) {
          table.rows().remove();
          table.rows.add(data).draw();
          return;
        }

        app.activeTables.forEach((element) => {
          if (element.name === "air_ticket_table") {
            return;
          }
        });

        table = new DataTable(".alg-panel2-table1", {
          data: data,
          columns: [
            { title: "SELECT" },
            { data: "date", title: "DATE" },
            { data: "passport_no", title: "PASSPORT NO" },
            { data: "airline", title: "AIRLINE" },
            { data: "start_date", title: "START DATE" },
            { data: "end_date", title: "END DATE" },
            { data: "baggage_kg", title: "BAGGAGE KG" },
            { data: "pathway", title: "PATHWAY" },
            { data: "customer", title: "CUSTOMER" },
            { data: "price", title: "PRICE" },
            { title: "STATUS" },
            { title: "ACTION" },
          ],

          lengthChange: false,
          info: false,
          autoWidth: true,
          stateSave: true,

          fixedHeader: {
            header: true,
          },
          scrollX: true,
          language: {
            // Customization for text
            lengthMenu: "Show _MENU_ entries",
            infoFiltered: "(filtered from _MAX_ total entries)",
            search: "",
          },

          columnDefs: [
            {
              render: function (data, type, row) {
                return `<input type="checkbox" class="form-check" data-tableitemselect onchange="KTCustomMain.setSelectedRowInTable(event, 'airTable', ${row.id})" />`;
              },
              targets: 0,
            },
            {
              render: function (data, type, row) {
                return `<div class="ms-2 bg-secondary badge rounded-1 fw-semibold">${row.status}</div>`;

                // return `<select class="alg-table-selector ms-2 badge rounded-1 fw-semibold" data-id="${
                //   row.id
                // }" onchange="KTCustomMain.updateAirTicketStatus(event)">
                //           <option class="px-1" value="1" ${
                //             row.status === "Confirmed" ? " selected " : ""
                //           } >Confirmed </option>
                //           <option class="px-1" value="2" ${
                //             row.status === "Pending" ? " selected " : ""
                //           } >Pending </option>
                //           <option class="px-1" value="3" ${
                //             row.status === "Cancelled" ? " selected " : ""
                //           } >Cancelled</option>
                //         </select>`;
              },
              targets: 10,
            },
            {
              render: function (data, type, row) {
                return `<select data-id="${row.id}" data-passport="${row.passport_no}" class="alg-table-selector ms-2 badge rounded-1 fw-semibold" onchange="KTCustomMain.panelAction(event)">
                          <option class="px-1" value="defaultAction">Select</option>
                          <option class="px-1" value="airTicketEditModel">Edit</option>
                          <option class="px-1" value="airTicketViewModel">View</option>
                          <option class="px-1" value="airTicketDeleteModel">Delete</option>
                        </select>`;
              },
              targets: 11,
            },
          ],
        });
        app.tableSearchSwitch("panel2-table1");

        app.activeTables.push({
          name: "air_ticket_table",
          table: table,
        });
      }

      await tableInit();

      // test
      this.setColumnWidths(".alg-panel2-table1", ["250px", "50px"]);

      app.EM.subscribe("table_destroy", () => {
        app.activeTables.forEach((element) => {
          element.table.destroy();
        });
      });

      // date picker
      // Initialize the date range picker
      $(function () {
        // Initialize the date range picker
        $("#dateRangeInputAirTicket").daterangepicker(
          {
            opens: "center",
            autoUpdateInput: false,
          },
          function (start, end, label) {
            // Update the display button text with the selected date range
            $("#displayRangeButtonAirTicket").text(
              start.format("MMM D") + " - " + end.format("MMM D")
            );

            app.tourManageSearchDateRange =
              start.format("YYYY-MM-DD") + " - " + end.format("YYYY-MM-DD");
            tableInit(app);
          }
        );
      });
    },

    // air ticket add UI data update
    async airTicketAddModalUIUpdate() {
      // customer selector
      this.updateSelectorWithServerData(
        "algModalPanel2AddCustomer",
        `/api/customer`
      );

      // set default currencty
      this.setSelectorOptions(
        "algModalPanel2AddCurrency",
        this.currencies,
        0,
        "id",
        "value"
      );
    },

    async addTicket() {
      const inputs = this.getInputValues("panel2AddInputGroup");
      console.log(inputs);
      const formData = this.createFormDataFromObject(inputs);
      const response = await this.addDataToServer(
        `/api/air/add`,
        formData,
        "panel2AddInputGroup",
        "panel2"
      );
    },

    //  update air ticket status
    updateAirTicketStatus(event) {
      const form = new FormData();
      form.append("id", event.target.dataset.id);
      form.append("status", event.target.value);

      this.fetchData(
        `${this.ROOT_URL}/api/air/changeStatus`,
        {
          method: "POST",
          body: form,
        },
        true,
        true,
        (data) => {
          this.showToast("Success", true);
        }
      );
    },

    updateAirTicketSelectedHotelId: null,
    /**
     * open hotel data edit modal
     *
     * @param {object} event - browser event object
     */
    async airTicketEditModel(event) {
      this.openModel("#algModalPanel2Update");
      this.updateAirTicketSelectedHotelId = event.target.dataset.id;

      const data = await this.fetchData(
        `${this.ROOT_URL}/api/air?id=${event.target.dataset.id}`
      );
      console.log(data);
      this.fillInputs("panel2UpdateInputGroup", data, false);
      await this.airTicketUpdateModalUIUpdate(data.customer_id, data.currency);
      document.getElementById("algModalPanel2UpdateCustomer").value =
        data.customer_id;

      document.getElementById("algModalPanel2UpdateStatus").value =
        data.status_id;

      this.defaultAction(event);
    },

    // hotel update UI data update
    async airTicketUpdateModalUIUpdate(customerId, currency) {
      // customer selector
      await this.updateSelectorWithServerData(
        "algModalPanel2UpdateCustomer",
        `/api/customer`,
        customerId
      );
      // this.updateSelectorWithServerData("algModalPanel1AddCountry", "/api/country");

      // set default currencty
      this.setSelectorOptions(
        "algModalPanel2UpdateCurrency",
        this.currencies,
        currency,
        "id",
        "value"
      );
    },

    /**
     * open the hotel view modal
     *
     * @param {object} event - browser events
     *
     */
    async airTicketViewModel(event) {
      this.openModel("#algModalPanel2View");

      const data = await this.fetchData(
        `${this.ROOT_URL}/api/air?id=${event.target.dataset.id}`
      );

      this.fillInputs("panel2ViewInputGroup", data);

      this.defaultAction(event);
    },

    /**
     * open hotel delete modal
     *
     * @param {object} event  - browser event
     */
    airTicketDeleteModel(event) {
      this.openModel("#algModalPanel2Delete");

      const dataset = event.target.dataset;

      this.fillInputs("panel2DeleteInputGroup", {
        id: dataset.id,
        passport: dataset.passport,
      });

      this.defaultAction(event);
    },

    // udpate air tickets
    updateAirTicket() {
      const inputs = this.getInputValues("panel2UpdateInputGroup");
      const id = this.updateAirTicketSelectedHotelId;

      console.log(id);

      const formData = this.createFormDataFromObject(inputs);
      formData.append("id", id);

      fetch(`${this.ROOT_URL}/api/air/update`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "success") {
            this.panelSwith("panel2");
            this.showToast("Success", true);
          } else if (data.status == "failed") {
            this.showToast(data.error);
            console.log(data);
          } else {
            console.log(data);
          }
        });
    },

    // delete air ticket
    deleteAirTicket() {
      const form = new FormData();
      form.append(
        "id",
        document.getElementById("panel2AirTicketDeleteId").value
      );

      this.fetchData(
        `${this.ROOT_URL}/api/air/delete`,
        {
          method: "POST",
          body: form,
        },
        true
      );

      this.panelSwith("panel2");
    },

    //
    //
    //
    // ---------------------------------------------------------- panel 3
    //
    //
    //

    // panel 3
    tourManageSearchDateRange: "2000-01-01 - 2099-12-31",
    tourTableSlectedRowData: [],
    async panel3Init() {
      const app = this;
      app.activeTables = [];

      let table = null;

      async function tableInit() {
        let dateRangeParam = "date_range=" + app.tourManageSearchDateRange;

        // load data
        const data = await app.fetchData(
          `${app.ROOT_URL}/api/tour?${dateRangeParam}`,
          {}
        );

        // thigns to do on any data update
        document.getElementById("tourManageTotalCountSpan").innerText =
          data.length;

        if (table) {
          table.rows().remove();
          table.rows.add(data).draw();
          return;
        }

        app.activeTables.forEach((element) => {
          if (element.name === "tour_manage_table") {
            return;
          }
        });

        console.log(data);

        table = new DataTable(".alg-panel3-table1", {
          data: data,
          columns: [
            { title: "SELECT" },
            { data: "date", title: "DATE" },
            { data: "name", title: "TOUR NAME" },
            { data: "duration", title: "DURATION" },
            { data: "people", title: "PEOPLE" },
            { data: "budget", title: "BUDGET" },
            { data: "customer", title: "CUSTOMER" },
            { title: "STATUS" },
            { title: "ACTION" },
          ],

          lengthChange: false,
          info: false,
          autoWidth: true,
          stateSave: true,

          fixedHeader: {
            header: true,
          },
          scrollX: true,

          language: {
            // Customization for text
            lengthMenu: "Show _MENU_ entries",
            infoFiltered: "(filtered from _MAX_ total entries)",
            search: "",
          },

          columnDefs: [
            { width: "15%", targets: 1 },
            { width: "15%", targets: 2 },
            { width: "10%", targets: 3 },
            { width: "10%", targets: 4 },
            { width: "10%", targets: 5 },
            { width: "20%", targets: 6 },
            {
              render: function (data, type, row) {
                return `<input type="checkbox" class="form-check" data-tableitemselect onchange="KTCustomMain.setSelectedRowInTable(event, 'tourTable', ${row.id})" />`;
              },
              width: "10%",
              targets: 0,
            },
            {
              render: function (data, type, row) {
                return `<div class="ms-2 bg-secondary badge rounded-1 fw-semibold">${row.status}</div>`;

                // return `<select class="alg-table-selector ms-2 badge rounded-1 fw-semibold" data-id="${
                //   row.id
                // }" onchange="KTCustomMain.updateTourManageStatus(event)">
                //           <option class="px-1" value="1" ${
                //             row.status === "Confirmed" ? " selected " : ""
                //           } >Confirmed </option>
                //           <option class="px-1" value="2" ${
                //             row.status === "Pending" ? " selected " : ""
                //           } >Pending </option>
                //           <option class="px-1" value="3" ${
                //             row.status === "Cancelled" ? " selected " : ""
                //           } >Cancelled</option>
                //         </select>`;
              },
              width: "20%",
              targets: 7,
            },
            {
              render: function (data, type, row) {
                return `<select data-id="${row.id}" data-tour_name="${row.name}" class="alg-table-selector ms-2 badge rounded-1 fw-semibold" onchange="KTCustomMain.panelAction(event)">
                          <option class="px-1" value="defaultAction">Select</option>
                          <option class="px-1" value="tourManageEditModel">Edit</option>
                          <option class="px-1" value="tourManageViewModel">View</option>
                          <option class="px-1" value="tourManageDeleteModel">Delete</option>
                        </select>`;
              },
              width: "20%",
              targets: 8,
            },
          ],
        });
        app.tableSearchSwitch("panel3-table1");
        // app.tableFooterSwitch("panel1-table1", 0);

        app.activeTables.push({
          name: "tour_manage_table",
          table: table,
        });
      }

      await tableInit();
      app.EM.subscribe("table_destroy", () => {
        app.activeTables.forEach((element) => {
          element.table.destroy();
        });
      });

      // date picker
      // Initialize the date range picker
      $(function () {
        // Initialize the date range picker
        $("#dateRangeInputTourManage").daterangepicker(
          {
            opens: "center",
            autoUpdateInput: false,
          },
          function (start, end, label) {
            // Update the display button text with the selected date range
            $("#displayRangeButtonTourManage").text(
              start.format("MMM D") + " - " + end.format("MMM D")
            );

            app.tourManageSearchDateRange =
              start.format("YYYY-MM-DD") + " - " + end.format("YYYY-MM-DD");
            tableInit(app);
          }
        );
      });
    },

    // air ticket add UI data update
    async tourManageAddModalUIUpdate() {
      // customer selector
      this.updateSelectorWithServerData(
        "algModalPanel3AddCustomer",
        `/api/customer`
      );

      // set default currencty
      this.setSelectorOptions(
        "algModalPanel3AddCurrency",
        this.currencies,
        0,
        "id",
        "value"
      );

      this.addTourHotelToPreviewArray = [];
      this.addTourHotelsToPreview();

      this.addTourLocationToPreviewArray = [];
      this.addTourLocationToPreview();
    },

    /**
     * open the hotel view modal
     *
     * @param {object} event - browser events
     *
     */
    async tourManageViewModel(event) {
      this.openModel("#algModalPanel3View");

      const data = await this.fetchData(
        `${this.ROOT_URL}/api/tour?id=${event.target.dataset.id}`
      );

      console.log(data);

      this.fillInputs("panel3ViewInputGroup", data);

      // cusotm UI updates
      document.getElementById("algModalPanel3ViewLocation").value =
        data.locations.join(", ");
      document.getElementById("algModalPanel3ViewHotel").value =
        data.tour_hotels.join(", ");

      this.defaultAction(event);
    },

    /**
     * open hotel delete modal
     *
     * @param {object} event  - browser event
     */
    tourManageDeleteModel(event) {
      this.openModel("#algModalPanel3Delete");

      const dataset = event.target.dataset;
      this.fillInputs("panel3DeleteInputGroup", {
        id: dataset.id,
        tour_name: dataset.tour_name,
      });

      this.defaultAction(event);
    },

    // delete tour Manage
    deleteTourManage() {
      const form = new FormData();
      form.append(
        "id",
        document.getElementById("panel3TourManageDeleteId").value
      );

      this.fetchData(
        `${this.ROOT_URL}/api/tour/delete`,
        {
          method: "POST",
          body: form,
        },
        true
      );

      this.panelSwith("panel3");
    },

    addTourLocationToPreviewArray: [],
    addTourLocationToPreview(
      id = "panel3LocationAddListPreview",
      isUpdate = false
    ) {
      const container = document.getElementById(id);
      container.innerHTML = "";
      this.addTourLocationToPreviewArray.forEach((element) => {
        container.innerHTML += `<span class="my-1 py-1 ps-4 pe-1 rounded-2 border border-3 border-secondary">${element} <i onclick="KTCustomMain.removeTourAddLocationTagFromArray('${element}',  '${id}', ${isUpdate})" class="bi bi-x-circle-fill"></i></span>`;
      });
    },

    removeTourAddLocationTagFromArray(element, id, isUpdate = false) {
      this.addTourLocationToPreviewArray =
        this.addTourLocationToPreviewArray.filter((item) => item !== element);
      this.addTourLocationToPreview(id, isUpdate);
    },

    addTourHotelToPreviewArray: [],
    addTourHotelsToPreview(id = "panel3HotelAddListPreview", isUpdate = false) {
      const container = document.getElementById(id);
      container.innerHTML = "";
      this.addTourHotelToPreviewArray.forEach((element) => {
        container.innerHTML += `<span class="my-1 py-1 ps-4 pe-1 rounded-2 border border-3 border-secondary">${element} <i onclick="KTCustomMain.removeTourAddHotelTagFromArray('${element}', '${id}', ${isUpdate})" class="bi bi-x-circle-fill"></i></span>`;
      });
    },

    removeTourAddHotelTagFromArray(element, id, isUpdate = false) {
      this.addTourHotelToPreviewArray = this.addTourHotelToPreviewArray.filter(
        (item) => item !== element
      );
      this.addTourHotelsToPreview(id, isUpdate);
    },

    addTourLocationToArrayFromInput(event) {
      if (event.key == "Enter") {
        this.addTourLocationToPreviewArray.push(event.target.value);
        event.target.value = "";
        this.addTourLocationToPreview();
      }
    },

    addTourUpdateLocationToArrayFromInput(event) {
      if (event.key == "Enter") {
        this.addTourLocationToPreviewArray.push(event.target.value);
        event.target.value = "";
        this.addTourLocationToPreview("panel3LocationUpdateListPreview", true);
      }
    },

    addTourHotelToArrayFromInput(event) {
      if (event.key == "Enter") {
        this.addTourHotelToPreviewArray.push(event.target.value);
        event.target.value = "";
        this.addTourHotelsToPreview();
      }
    },

    addTourUpdateHotelToArrayFromInput(event) {
      if (event.key == "Enter") {
        this.addTourHotelToPreviewArray.push(event.target.value);
        event.target.value = "";
        this.addTourHotelsToPreview("panel3HotelUpdateListPreview", true);
      }
    },

    // add tour data
    addTour() {
      const inputs = this.getInputValues("panel3AddInputGroup");

      inputs.tour_hotels = this.addTourHotelToPreviewArray;
      inputs.tour_locations = this.addTourLocationToPreviewArray;

      fetch(`${this.ROOT_URL}/api/tour/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.status === "success") {
            this.showToast("Success", true);
            this.resetInputsToDefault(
              document.getElementById("panel3AddInputGroup")
            );

            this.addTourHotelToPreviewArray = [];
            this.addTourLocationToPreviewArray = [];
            this.addTourLocationToPreview();
            this.addTourHotelsToPreview();
            this.closeAllModals();
            this.panelSwith("panel3");
          } else if (responseData.status === "failed") {
            this.showToast(responseData.error);
          } else {
            console.error("Error adding tour:", responseData);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    //  update tour status
    updateTourManageStatus(event) {
      const form = new FormData();
      form.append("id", event.target.dataset.id);
      form.append("status", event.target.value);

      this.fetchData(
        `${this.ROOT_URL}/api/tour/changeStatus`,
        {
          method: "POST",
          body: form,
        },
        true,
        true,
        (data) => {
          this.showToast("Successfully Updated", true);
        }
      );
    },

    updateTourManageSelectedTourId: null,
    /**
     * open tour data edit modal
     *
     * @param {object} event - browser event object
     */
    async tourManageEditModel(event) {
      this.addTourLocationToPreviewArray = [];
      this.addTourHotelToPreviewArray = [];

      this.openModel("#algModalPanel3Update");
      this.updateTourManageSelectedTourId = event.target.dataset.id;

      const data = await this.fetchData(
        `${this.ROOT_URL}/api/tour?id=${event.target.dataset.id}`
      );
      console.log(data);

      this.fillInputs("panel3UpdateInputGroup", data, false);

      // cusotm UI updates
      this.addTourLocationToPreviewArray = data.locations;
      this.addTourHotelToPreviewArray = data.tour_hotels;

      await this.tourUpdateModalUIUpdate(data.customer_id);
      document.getElementById("algModalPanel3UpdateCustomer").value =
        data.customer_id;

      document.getElementById("algModalPanel3UpdateStatus").value =
        data.status_id;

      this.addTourHotelsToPreview("panel3HotelUpdateListPreview");
      document.getElementById("algModalPanel3UpdateHotels").value = "";

      this.addTourLocationToPreview("panel3LocationUpdateListPreview");
      document.getElementById("algModalPanel3UpdateTourLocation").value = "";

      // set default currencty
      this.setSelectorOptions(
        "algModalPanel3UpdateCurrency",
        this.currencies,
        data.currency,
        "id",
        "value"
      );

      this.defaultAction(event);
    },

    // udpate air tickets
    updateTour() {
      const inputs = this.getInputValues("panel3UpdateInputGroup");
      inputs.id = this.updateTourManageSelectedTourId;
      inputs.tour_hotels = this.addTourHotelToPreviewArray;
      inputs.tour_locations = this.addTourLocationToPreviewArray;

      fetch(`${this.ROOT_URL}/api/tour/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "success") {
            this.showToast("Successfully Updated", true);
            this.addTourHotelToPreviewArray = [];
            this.addTourLocationToPreviewArray = [];
            this.addTourLocationToPreview();
            this.addTourHotelsToPreview();
            this.closeAllModals();
            this.panelSwith("panel3");
          } else if (data.status == "failed") {
            this.showToast(data.error);
            console.log(data);
          } else {
            console.log(data);
          }
        });
    },

    // hotel update UI data update
    async tourUpdateModalUIUpdate(customerId) {
      // customer selector
      await this.updateSelectorWithServerData(
        "algModalPanel3UpdateCustomer",
        `/api/customer`,
        customerId
      );
      // this.updateSelectorWithServerData("algModalPanel1AddCountry", "/api/country");
    },

    //
    //
    //
    // ---------------------------------------------------------- panel 4
    //
    //
    //

    inventorySearchDateRange: "2000-01-01 - 2099-12-31",
    inventoryTableSlectedRowData: [],
    inventoryImagesArrayProduct: [],
    inventoryImagesArrayProductUpdate: [],
    async panel4Init() {
      const app = this;
      app.activeTables = [];

      let table = null;

      async function tableInit() {
        let dateRangeParam = "date_range=" + app.inventorySearchDateRange;

        // load data
        const data = await app.fetchData(
          `${app.ROOT_URL}/api/inventory?${dateRangeParam}`,
          {}
        );

        // thigns to do on any data update
        document.getElementById("inventoryTotalCountSpan").innerText =
          data.length;

        if (table) {
          table.rows().remove();
          table.rows.add(data).draw();
          return;
        }

        app.activeTables.forEach((element) => {
          if (element.name === "inventory_table") {
            return;
          }
        });

        table = new DataTable(".alg-panel4-table1", {
          data: data,
          columns: [
            { title: "SELECT" },
            { data: "inventory_date", title: "DATE" },
            { data: "product_name", title: "ITEM NAME" },
            { data: "stock_no", title: "ITEM NUMBER" },
            { data: "product_description", title: "DESCRIPTION" },
            { data: "qty_stock", title: "STOCK QTY" },
            { title: "ACTION" },
          ],

          lengthChange: false,
          info: false,
          autoWidth: true,
          stateSave: true,

          fixedHeader: {
            header: true,
          },
          scrollX: true,

          language: {
            // Customization for text
            lengthMenu: "Show _MENU_ entries",
            infoFiltered: "(filtered from _MAX_ total entries)",
            search: "",
          },

          columnDefs: [
            {
              render: function (data, type, row) {
                return `<input type="checkbox" class="form-check" data-tableitemselect onchange="KTCustomMain.setSelectedRowInTable(event, 'inventoryTable', ${row.id})" />`;
              },
              targets: 0,
            },
            {
              render: function (data, type, row) {
                return `<select data-id="${row.id}" data-product_name="${row.product_name}" class="alg-table-selector ms-2 badge rounded-1 fw-semibold" onchange="KTCustomMain.panelAction(event)">
                          <option class="px-1" value="defaultAction">Select</option>
                          <option class="px-1" value="inventoryEditModel">Edit</option>
                          <option class="px-1" value="inventoryViewModel">View</option>
                          <option class="px-1" value="inventoryDeleteModel">Delete</option>
                        </select>`;
              },
              targets: 6,
            },
          ],
        });
        app.tableSearchSwitch("panel4-table1");
        // app.tableFooterSwitch("panel1-table1", 0);

        app.activeTables.push({
          name: "inventory_table",
          table: table,
        });
      }

      await tableInit();
      app.EM.subscribe("table_destroy", () => {
        app.activeTables.forEach((element) => {
          element.table.destroy();
        });
      });

      // date picker
      // Initialize the date range picker
      $(function () {
        // Initialize the date range picker
        $("#dateRangeInputInventory").daterangepicker(
          {
            opens: "center",
            autoUpdateInput: false,
          },
          function (start, end, label) {
            // Update the display button text with the selected date range
            $("#displayRangeButtonInventory").text(
              start.format("MMM D") + " - " + end.format("MMM D")
            );

            app.inventorySearchDateRange =
              start.format("YYYY-MM-DD") + " - " + end.format("YYYY-MM-DD");
            tableInit(app);
          }
        );
      });

      this.imageSelector(1, this.inventoryImagesArrayProduct, 1);
      this.imageSelector(2, this.inventoryImagesArrayProductUpdate, 2);
    },

    /**
     * open the hotel view modal
     *
     * @param {object} event - browser events
     *
     */
    async inventoryViewModel(event) {
      this.openModel("#algModalPanel4View");

      const data = await this.fetchData(
        `${this.ROOT_URL}/api/inventory?id=${event.target.dataset.id}`
      );
      console.log(data);
      this.fillInputs("panel4ViewInputGroup", data);

      document.getElementById(
        "inventoryViewImagePreviewBox"
      ).style.backgroundImage = `url('${this.ROOT_URL}/assets/images/inventory/${data.product_image}')`;

      document.getElementById("algModalPanel4ViewProudctType").value =
        data.product_type;

      this.defaultAction(event);
    },

    /**
     * open inventory delete modal
     *
     * @param {object} event  - browser event
     */
    inventoryDeleteModel(event) {
      this.openModel("#algModalPanel4Delete");

      const dataset = event.target.dataset;
      this.fillInputs("panel4DeleteInputGroup", {
        id: dataset.id,
        product_name: dataset.product_name,
      });

      this.defaultAction(event);
    },

    // delete tour Manage
    deleteInventory() {
      const form = new FormData();
      form.append(
        "id",
        document.getElementById("panel4HInventoryDeleteModalId").value
      );

      this.fetchData(
        `${this.ROOT_URL}/api/inventory/delete`,
        {
          method: "POST",
          body: form,
        },
        true
      );

      this.panelSwith("panel4");
    },

    // add Inventory data
    addInventory() {
      const inputs = this.getInputValues("panel4AddInputGroup");
      const formData = this.createFormDataFromObject(inputs);

      formData.append("image", document.getElementById("fileInput1").files[0]);

      this.addDataToServer(
        `/api/inventory/add`,
        formData,
        "panel4AddInputGroup",
        "panel4"
      );
    },

    updateInventorySelectedHotelId: null,
    /**
     * open hotel data edit modal
     *
     * @param {object} event - browser event object
     */
    async inventoryEditModel(event) {
      this.openModel("#algModalPanel4Update");
      this.updateInventorySelectedHotelId = event.target.dataset.id;

      const data = await this.fetchData(
        `${this.ROOT_URL}/api/inventory?id=${event.target.dataset.id}`
      );
      console.log(data);
      this.fillInputs("panel4UpdateInputGroup", data, false);

      this.updateImagesInventory(
        data.product_image,
        2,
        "inventory",
        "inventoryImagesArrayProductUpdate"
      );

      document.getElementById("algModalPanel4UpdateProudctType").value =
        data.product_type;

      this.defaultAction(event);
    },

    updateImagesInventory(images, boxId, path, tempArrayName) {
      if (!images) {
        return;
      }

      const container = document.getElementById(`imagePreviewBox${boxId}`);
      container.innerHTML = images.length ? "" : "No images to Show!";
      this[tempArrayName] = images;
      let noImage = false;
      images.forEach((element) => {
        if (element.image === "default.svg") {
          noImage = true;
          return;
        }

        container.innerHTML += `<div class="d-flex position-relative">
                                      <div class="alg-vehicles-image-preview rounded-1" style="background-image: url('${this.ROOT_URL}/assets/images/${path}/${element.image}');"></div>
                                      <i onclick="KTCustomMain.removeSelectedImageFromInventoryUpdate(${boxId}, ${element.id})" class="position-absolute bi bi-x-circle-fill"></i>
                                  </div>`;
      });
      if (noImage) {
        container.innerHTML += "No Image to Show...";
      }
    },

    // udpate air tickets
    updateInventory() {
      const inputs = this.getInputValues("panel4UpdateInputGroup");
      const id = this.updateInventorySelectedHotelId;

      const formData = this.createFormDataFromObject(inputs);
      formData.append("id", id);
      console.log(this.inventoryImagesArrayProductUpdate);
      return;
      formData.append(
        "image",
        this.convertDataUrlsToFileObjects(
          this.inventoryImagesArrayProductUpdate
        )
      );

      fetch(`${this.ROOT_URL}/api/inventory/update`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "success") {
            this.showToast("Successfully updated", true);
            this.InventoryAddModalUIUpdate();

            this.closeAllModals();
            this.panelSwith("panel4");
          } else if (data.status == "failed") {
            this.showToast(data.error);
            console.log(data);
          } else {
            console.log(data);
          }
        });
    },

    InventoryAddModalUIUpdate() {
      this.resetInputsToDefault(document.getElementById("panel4AddInputGroup"));
      document.getElementById(
        "inventoryAddImagePreviewBox"
      ).style.backgroundImage = ``;
    },

    //
    //
    //
    // ---------------------------------------------------------- panel 5
    //
    //
    //

    visaSearchDateRange: "2000-01-01 - 2099-12-31",
    visaTableSlectedRowData: [],
    async panel5Init() {
      const app = this;
      app.activeTables = [];

      let table = null;

      async function tableInit() {
        let dateRangeParam = "date_range=" + app.visaSearchDateRange;

        // load data
        const data = await app.fetchData(
          `${app.ROOT_URL}/api/visa?${dateRangeParam}`,
          {}
        );
        console.log(data);

        // thigns to do on any data update
        document.getElementById("visaTotalCountSpan").innerText = data.length;

        if (table) {
          table.rows().remove();
          table.rows.add(data).draw();
          return;
        }

        app.activeTables.forEach((element) => {
          if (element.name === "visa_table") {
            return;
          }
        });

        table = new DataTable(".alg-panel5-table1", {
          data: data,
          columns: [
            { title: "SELECT" },
            { data: "id", title: "VISA ID" },
            { data: "agent", title: "AGENT" },
            { data: "passengers", title: "PASSENGERS" },
            { data: "payment_status", title: "PAYMENT STATUS" },
            { data: "payment_type", title: "PAYMENT TYPE" },
            { data: "visa_category", title: "VISA CATEGORY" },
            { data: "approvel_status", title: "APPROVAL STATUS" },
            { data: "collect_status", title: "COLLECT STATUS" },
            { data: "total_cost", title: "COST" },
            { title: "ACTION" },
          ],

          lengthChange: false,
          info: false,
          autoWidth: true,
          stateSave: true,

          fixedHeader: {
            header: true,
          },
          scrollX: true,

          language: {
            // Customization for text
            lengthMenu: "Show _MENU_ entries",
            infoFiltered: "(filtered from _MAX_ total entries)",
            search: "",
          },

          columnDefs: [
            {
              render: function (data, type, row) {
                return `<input type="checkbox" class="form-check" data-tableitemselect onchange="KTCustomMain.setSelectedRowInTable(event, 'visaTable', ${row.id})" />`;
              },
              targets: 0,
            },
            {
              render: function (data, type, row) {
                return `<select data-id="${row.id}" data-visa_id="${row.visa_id}" class="alg-table-selector ms-2 badge rounded-1 fw-semibold" onchange="KTCustomMain.panelAction(event)">
                          <option class="px-1" value="defaultAction">Select</option>
                          <option class="px-1" value="visaEditModel">Edit</option>
                          <option class="px-1" value="visaViewModel">View</option>
                          <option class="px-1" value="visaDeleteModel">Delete</option>
                        </select>`;
              },
              targets: 10,
            },
          ],
        });
        app.tableSearchSwitch("panel5-table1");
        // app.tableFooterSwitch("panel1-table1", 0);

        app.activeTables.push({
          name: "visa_table",
          table: table,
        });
      }
      await tableInit();

      app.EM.subscribe("table_destroy", () => {
        app.activeTables.forEach((element) => {
          element.table.destroy();
        });
      });

      // date picker
      // Initialize the date range picker
      $(function () {
        // Initialize the date range picker
        $("#dateRangeInputVisa").daterangepicker(
          {
            opens: "center",
            autoUpdateInput: false,
          },
          function (start, end, label) {
            // Update the display button text with the selected date range
            $("#displayRangeButtonVisa").text(
              start.format("MMM D") + " - " + end.format("MMM D")
            );

            app.visaSearchDateRange =
              start.format("YYYY-MM-DD") + " - " + end.format("YYYY-MM-DD");
            tableInit(app);
          }
        );
      });
    },

    // add Visa data
    async addVisa(refreshPanel = "panel5") {
      // delay
      let isDelayed = true;
      setTimeout(() => {
        if (isDelayed) {
          this.showToast("Processing...", true);
        }
      }, 500);

      const inputs = this.getInputValues("panel5AddInputGroup");
      console.log(inputs);
      const formData = this.createFormDataFromObject(inputs);
      await this.addDataToServer(
        `/api/visa/add`,
        formData,
        "panel5AddInputGroup",
        refreshPanel
      );
      isDelayed = false;
    },

    visaAddModalUIUpdate() {
      // customer selector
      this.updateSelectorWithServerData(
        "algModalPanel5AddCustomer",
        `/api/customer`
      );

      // customer selector
      this.updateSelectorWithServerData("algModalPanel5Agent", `/api/agent`);

      // customer selector
      this.updateSelectorWithServerData(
        "algModalPanel5Country",
        `/api/country`,
        0,
        "id",
        "country"
      );

      // set default currencty
      this.setSelectorOptions(
        "algModalPanel5AddCurrency",
        this.currencies,
        0,
        "id",
        "value"
      );
    },

    /**
     * open the hotel view modal
     *
     * @param {object} event - browser events
     *
     */
    async visaViewModel(event) {
      this.openModel("#algModalPanel5View");

      const data = await this.fetchData(
        `${this.ROOT_URL}/api/visa?id=${event.target.dataset.id}`
      );

      console.log(data);

      this.fillInputs("panel5ViewInputGroup", data);

      this.defaultAction(event);
    },

    /**
     * open inventory delete modal
     *
     * @param {object} event  - browser event
     */
    visaDeleteSelectedItem: null,
    visaDeleteModel(event) {
      this.openModel("#algModalPanel5Delete");

      const dataset = event.target.dataset;
      console.log(dataset);
      this.fillInputs("panel5DeleteInputGroup", {
        id: dataset.id,
        visa_id: dataset.visa_id,
      });

      this.visaDeleteSelectedItem = dataset.id;

      this.defaultAction(event);
    },

    async visaUpdateModalUIUpdate(currency) {
      // customer selector
      await this.updateSelectorWithServerData(
        "algModalPanel5UpdateCustomer",
        `/api/customer`
      );

      // customer selector
      await this.updateSelectorWithServerData(
        "algModalPanel5UpdateAgent",
        `/api/agent`
      );

      // customer selector
      await this.updateSelectorWithServerData(
        "algModalPanel5UpdateCountry",
        `/api/country`,
        0,
        "id",
        "country"
      );

      // set default currencty
      this.setSelectorOptions(
        "algModalPanel5UpdateCurrency",
        this.currencies,
        currency,
        "id",
        "value"
      );
    },

    updateVisaSelectedVisaId: null,
    /**
     * open hotel data edit modal
     *
     * @param {object} event - browser event object
     */
    async visaEditModel(event) {
      this.openModel("#algModalPanel5Update");

      const data = await this.fetchData(
        `${this.ROOT_URL}/api/visa?id=${event.target.dataset.id}`
      );
      this.updateVisaSelectedVisaId = data.id;

      this.fillInputs("panel5UpdateInputGroup", data, false);
      await this.visaUpdateModalUIUpdate(data.currency);

      document.getElementById("algModalPanel5UpdateSubmissionType").value =
        data.submission_type_id;
      document.getElementById("algModalPanel5UpdateCustomer").value =
        data.customers_id;
      document.getElementById("algModalPanel5UpdateAgent").value =
        data.agents_id;
      document.getElementById("algModalPanel5UpdateCountry").value =
        data.countries_id;

      document.getElementById("algModalPanel5PaymentUpdateType").value =
        data.payment_status_id;

      document.getElementById("algModalPanel5PaymentUpdateStatus").value =
        data.payment_type_id;

      document.getElementById("algModalPanel5VisaViewViewCategory").value =
        data.visa_category_id;

      document.getElementById("algModalPanel5VisaApprovalUpdateStatus").value =
        data.approvel_status_id;

      document.getElementById("algModalPanel5VisaCollectUpdateStatus").value =
        data.collect_status_id;

      this.defaultAction(event);
    },

    // udpate air tickets
    updateVisa(refreshPanel = "panel5") {
      const inputs = this.getInputValues("panel5UpdateInputGroup");
      const id = this.updateVisaSelectedVisaId;

      console.log(id);

      const formData = this.createFormDataFromObject(inputs);
      formData.append("id", id);

      console.log(inputs);
      console.log(id);

      fetch(`${this.ROOT_URL}/api/visa/update`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "success") {
            this.showToast("Success", true);
            this.closeAllModals();
            this.panelSwith(refreshPanel);
          } else if (data.status == "failed") {
            this.showToast(data.error);
            console.log(data);
          } else {
            console.log(data);
          }
        });
    },

    // delete visa
    deleteVisa() {
      if (!this.visaDeleteSelectedItem) {
        return;
      }

      const form = new FormData();
      form.append("id", this.visaDeleteSelectedItem);

      this.fetchData(
        `${this.ROOT_URL}/api/visa/delete`,
        {
          method: "POST",
          body: form,
        },
        true
      );

      this.panelSwith("panel5");
    },

    //
    //
    //
    // ---------------------------------------------------------- panel 6
    //
    //
    //

    customerTableSlectedRowData: [],
    async panel6Init() {
      const app = this;
      app.activeTables = [];

      let table = null;

      async function tableInit() {
        // load data
        const data = await app.fetchData(
          `${app.ROOT_URL}/api/customer?selected=true`,
          {}
        );
        console.log(data);

        // thigns to do on any data update
        document.getElementById("customerTotalCountSpan").innerText =
          data.length;

        if (table) {
          table.rows().remove();
          table.rows.add(data).draw();
          return;
        }

        app.activeTables.forEach((element) => {
          if (element.name === "customer_table") {
            return;
          }
        });

        table = new DataTable(".alg-panel6-table1", {
          data: data,
          columns: [
            { title: "SELECT" },
            { data: "id", title: "ID" },
            { data: "registerd_date", title: "DATE" },
            { data: "full_name", title: "NAME" },
            { data: "email", title: "E-MAIL" },
            { data: "contact", title: "CONTACT" },
            { data: "address", title: "ADDRESS" },
            { data: "country", title: "COUNTRY" },
            { title: "ACTION" },
          ],

          lengthChange: false,
          info: false,
          autoWidth: true,
          stateSave: true,

          fixedHeader: {
            header: true,
          },
          scrollX: true,

          language: {
            // Customization for text
            lengthMenu: "Show _MENU_ entries",
            infoFiltered: "(filtered from _MAX_ total entries)",
            search: "",
          },

          columnDefs: [
            {
              render: function (data, type, row) {
                return `<input type="checkbox" class="form-check" data-tableitemselect onchange="KTCustomMain.setSelectedRowInTable(event, 'customerTable', ${row.id})" />`;
              },
              targets: 0,
            },
            {
              render: function (data, type, row) {
                return `<select data-id="${row.id}" data-full_name="${row.full_name}" class="alg-table-selector ms-2 badge rounded-1 fw-semibold" onchange="KTCustomMain.panelAction(event)">
                          <option class="px-1" value="defaultAction">Select</option>
                          <option class="px-1" value="customerEditModel">Edit</option>
                          <option class="px-1" value="customerViewModel">View</option>
                          <option class="px-1" value="customerDeleteModel">Delete</option>
                        </select>`;
              },
              targets: 8,
            },
          ],
        });
        app.tableSearchSwitch("panel6-table1");
        // app.tableFooterSwitch("panel1-table1", 0);

        app.activeTables.push({
          name: "customer_table",
          table: table,
        });
      }

      await tableInit();
      app.EM.subscribe("table_destroy", () => {
        app.activeTables.forEach((element) => {
          element.table.destroy();
        });
      });
    },

    async customerUpdateModalUIUpdate() {
      // country selector
      await this.updateSelectorWithServerData(
        "algModalPanel6UpdateCountry",
        "/api/country",
        0,
        "id",
        "country"
      );
    },

    updateCustomerSelectedCustomerId: null,
    /**
     * open customer edit modal
     *
     * @param {object} event - browser event object
     */
    async customerEditModel(event) {
      this.openModel("#algModalPanel6Update");

      const data = await this.fetchData(
        `${this.ROOT_URL}/api/customer?id=${event.target.dataset.id}`
      );
      this.updateCustomerSelectedCustomerId = data.id;

      this.fillInputs("panel6UpdateInputGroup", data, false);
      await this.customerUpdateModalUIUpdate();

      document.getElementById("algModalPanel6UpdateCountry").value =
        data.country_id;

      console.log(data.customer_image);

      document.getElementById(
        "customerUpdateImagePreviewUpdateBox"
      ).style.backgroundImage = `url('${this.ROOT_URL}/assets/images/customer/${
        data.customer_image ?? "default.svg"
      }')`;

      this.defaultAction(event);
    },

    updateCustomer() {
      const inputs = this.getInputValues("panel6UpdateInputGroup");
      const id = this.updateCustomerSelectedCustomerId;

      const formData = this.createFormDataFromObject(inputs);
      formData.append("id", id);

      const imageInput = document.getElementById(
        "algModalPanel6UpdatePictureInput"
      );
      if (imageInput.files[0]) {
        formData.append("image", imageInput.files[0]);
      }

      fetch(`${this.ROOT_URL}/api/customer/update`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "success") {
            this.showToast("Successfully updated", true);
            this.closeAllModals();
            this.panelSwith("panel6");
          } else if (data.status == "failed") {
            this.showToast(data.error);
          } else {
            console.log(data);
          }
        });
    },

    /**
     * open the hotel view modal
     *
     * @param {object} event - browser events
     *
     */
    async customerViewModel(event) {
      this.openModel("#algModalPanel6View");

      const data = await this.fetchData(
        `${this.ROOT_URL}/api/customer?id=${event.target.dataset.id}`
      );

      this.fillInputs("panel6ViewInputGroup", data);
      // customer selector
      this.updateSelectorWithServerData(
        "algModalPanel6ViewCountry",
        `/api/country`,
        data.country_id,
        "id",
        "country"
      );

      document.getElementById(
        "hotelViewImagePreviewBox"
      ).style.backgroundImage = `url('${this.ROOT_URL}/assets/images/customer/${data.customer_image}')`;

      this.defaultAction(event);
    },

    addCustomer() {
      const formdata = this.createFormDataFromObject(
        this.getInputValues("panel6AddInputGroup")
      );

      formdata.append(
        "image",
        document.getElementById("algModalPanel6AddPictureInput").files[0]
      );

      this.addDataToServer(
        "/api/customer/add",
        formdata,
        "panel6AddInputGroup",
        "panel6"
      );
    },

    async CustomerAddModalUIUpdate() {
      // country selector
      await this.updateSelectorWithServerData(
        "algModalPanel6AddCountry",
        "/api/country",
        0,
        "id",
        "country"
      );

      document.getElementById(
        "customerAddImagePreviewAddBox"
      ).style.backgroundImage = `url('${this.ROOT_URL}/assets/images/customer/default.svg')`;
    },

    /**
     * open inventory delete modal
     *
     * @param {object} event  - browser event
     */
    customerDeleteModel(event) {
      this.openModel("#algModalPanel6Delete");

      const dataset = event.target.dataset;
      this.fillInputs("panel6DeleteInputGroup", {
        id: dataset.id,
        full_name: dataset.full_name,
      });

      this.defaultAction(event);
    },

    // delete customer
    deleteCustomer() {
      const form = new FormData();
      form.append(
        "id",
        document.getElementById("panel6HCustomerDeleteModalId").value
      );

      this.fetchData(
        `${this.ROOT_URL}/api/customer/delete`,
        {
          method: "POST",
          body: form,
        },
        true
      );

      this.closeAllModals();
      this.panelSwith("panel6");
    },

    //
    //
    //
    // ---------------------------------------------------------- panel 7
    //
    //
    //
    employeeTableSlectedRowData: [],
    async panel7Init() {
      const app = this;
      app.activeTables = [];
      let table = null;
      async function tableInit() {
        // load data
        const data = await app.fetchData(
          `${app.ROOT_URL}/api/employee?selected=true`,
          {}
        );

        // thigns to do on any data update
        document.getElementById("employeeTotalCountSpan").innerText =
          data.length;
        if (table) {
          table.rows().remove();
          table.rows.add(data).draw();
          return;
        }
        app.activeTables.forEach((element) => {
          if (element.name === "employee_table") {
            return;
          }
        });

        table = new DataTable(".alg-panel7-table1", {
          data: data,
          columns: [
            { title: "SELECT" },
            { data: "first_name", title: "NAME" },
            { data: "id", title: "EMPLOYEE ID" },
            { data: "email", title: "E-MAIL" },
            { data: "phone", title: "CONTACT" },
            { data: "address", title: "ADDRESS" },
            { data: "role", title: "ROLE" },
            { title: "STATUS" },
            { title: "ACTION" },
          ],
          lengthChange: false,
          info: false,
          autoWidth: true,
          stateSave: true,
          fixedHeader: {
            header: true,
          },
          scrollX: true,
          language: {
            // Customization for text
            lengthMenu: "Show _MENU_ entries",
            infoFiltered: "(filtered from _MAX_ total entries)",
            search: "",
          },
          columnDefs: [
            {
              render: function (data, type, row) {
                return `<input type="checkbox" class="form-check" data-tableitemselect onchange="KTCustomMain.setSelectedRowInTable(event, 'employeeTable', ${row.id})" />`;
              },
              targets: 0,
            },
            {
              render: function (data, type, row) {
                return `<span class="px-3 py-1 rounded-1" style="${
                  row.status === "Active"
                    ? " color: #50CD89 !important; background-color: #E8FFF3; "
                    : " color: #F6C000 !important; background-color: #FFF8DD; "
                }">${row.status}</span>`;
              },
              targets: 7,
            },
            {
              render: function (data, type, row) {
                return `<select data-id="${row.id}" data-first_name="${row.first_name}" class="alg-table-selector ms-2 badge rounded-1 fw-semibold" onchange="KTCustomMain.panelAction(event)">
                          <option class="px-1" value="defaultAction">Select</option>
                          <option class="px-1" value="employeeEditModel">Edit</option>
                          <option class="px-1" value="employeeViewModel">View</option>
                          <option class="px-1" value="employeeDeleteModel">Delete</option>
                        </select>`;
              },
              targets: 8,
            },
          ],
        });

        app.tableSearchSwitch("panel7-table1");
        // app.tableFooterSwitch("panel1-table1", 0);
        app.activeTables.push({
          name: "employee_table",
          table: table,
        });
      }
      await tableInit();
      app.EM.subscribe("table_destroy", () => {
        app.activeTables.forEach((element) => {
          element.table.destroy();
        });
      });
    },

    employeeAddModalUIUpdate() {
      // country selector
      this.updateSelectorWithServerData(
        "algModalPanel7AddCountry",
        "/api/country",
        0,
        "id",
        "country"
      );

      // role selector
      this.updateSelectorWithServerData(
        "algModalPanel7AddRole",
        "/api/role",
        0,
        "role_id",
        "role_name"
      );
    },

    addEmployee() {
      const inputs = this.getInputValues("panel7AddInputGroup");
      const formData = this.createFormDataFromObject(inputs);

      formData.append(
        "employee_image",
        document.getElementById("algModalPanel7AddPictureInput").files[0]
      );

      this.addDataToServer(
        `/api/employee/add`,
        formData,
        "panel7AddInputGroup",
        "panel7"
      );
    },

    async employeeUpdateModalUIUpdate() {
      // country selector
      await this.updateSelectorWithServerData(
        "algModalPanel7UpdateCountry",
        "/api/country",
        0,
        "id",
        "country"
      );

      // role selector
      await this.updateSelectorWithServerData(
        "algModalPanel7UpdateRole",
        "/api/role",
        0,
        "role_id",
        "role_name"
      );
    },

    updateEmployeeSelectedEmployeeId: null,
    /**
     * open hotel data edit modal
     *
     * @param {object} event - browser event object
     */
    async employeeEditModel(event) {
      this.openModel("#algModalPanel7UpdateModal");

      const data = await this.fetchData(
        `${this.ROOT_URL}/api/employee?id=${event.target.dataset.id}`
      );
      this.updateEmployeeSelectedEmployeeId = data.id;

      this.fillInputs("panel7UpdateInputGroup", data, false);
      await this.employeeUpdateModalUIUpdate();

      document.getElementById("algModalPanel7UpdateCountry").value =
        data.countries_id;
      document.getElementById("algModalPanel7UpdateRole").value = data.role_id;

      document.getElementById(
        "employeeUpdateImagePreviewBox"
      ).style.backgroundImage = `url('${this.ROOT_URL}/assets/images/employee/${data.employee_image}')`;

      this.defaultAction(event);
    },

    updateEmployee() {
      this.updateEmployeeSelectedEmployeeId;

      const formData = this.createFormDataFromObject(
        this.getInputValues("panel7UpdateInputGroup")
      );
      formData.append("id", this.updateEmployeeSelectedEmployeeId);

      const updateImageInput = document.getElementById(
        "algModalPanel7UpdateAvatar"
      );
      formData.append("employee_image", updateImageInput.files[0] ?? "");

      this.addDataToServer(
        "/api/employee/update",
        formData,
        "algModalPanel7UpdateModal",
        "panel7"
      );
    },

    /**
     * open the employee view modal
     *
     * @param {object} event - browser events
     *
     */
    async employeeViewModel(event) {
      this.openModel("#algModalPanel7ViewModal");

      const data = await this.fetchData(
        `${this.ROOT_URL}/api/employee?id=${event.target.dataset.id}`
      );
      console.log(data);
      this.fillInputs("panel7ViewInputGroup", data);

      document.getElementById(
        "employeeViewImagePreviewBox"
      ).style.backgroundImage = `url('${this.ROOT_URL}/assets/images/employee/${data.employee_image}')`;

      this.defaultAction(event);
    },

    /**
     * open employee delete modal
     *
     * @param {object} event  - browser event
     */
    employeeDeleteModel(event) {
      this.openModel("#algModalPanel7Delete");

      const dataset = event.target.dataset;
      this.fillInputs("panel7DeleteInputGroup", {
        id: dataset.id,
        first_name: dataset.first_name,
      });

      this.defaultAction(event);
    },

    // delete customer
    deleteEmployee() {
      const form = new FormData();
      form.append(
        "id",
        document.getElementById("panel7EmployeeDeleteModalId").value
      );

      this.fetchData(
        `${this.ROOT_URL}/api/employee/delete`,
        {
          method: "POST",
          body: form,
        },
        true
      );

      this.panelSwith("panel7");
    },

    logout() {
      const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

      fetch("https://admin.dadtravels.lk/logout", {
        method: "POST",
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == "success") {
            window.location.href = `${this.ROOT_URL}/`;
          } else if (data.status == "failed") {
            console.log(data.error);
          } else {
            console.log(data);
          }
        })
        .catch((error) => console.error("Error:", error));
    },

    //
    //
    //
    // ---------------------------------------------------------- panel 8
    //
    //
    //

    agentSearchDateRange: "2000-01-01 - 2099-12-31",
    agentTableSlectedRowData: [],
    agentImagesArrayNic: [],
    async panel8Init() {
      const app = this;
      app.activeTables = [];
      let table = null;
      async function tableInit() {
        let dateRangeParam = "date_range=" + app.agentSearchDateRange;

        // load data
        const data = await app.fetchData(
          `${app.ROOT_URL}/api/agent?${dateRangeParam}`,
          {}
        );
        console.log(data);
        // thigns to do on any data update
        document.getElementById("agentTotalCountSpan").innerText = data.length;
        if (table) {
          table.rows().remove();
          table.rows.add(data).draw();
          return;
        }
        app.activeTables.forEach((element) => {
          if (element.name === "agent_table") {
            return;
          }
        });
        table = new DataTable(".alg-panel8-table1", {
          data: data,
          columns: [
            { title: "SELECT" },
            { data: "agents_id", title: "AGENT ID" },
            { data: "date", title: "DATE" },
            { data: "full_name", title: "NAME" },
            { data: "email", title: "E-MAIL" },
            { data: "contact", title: "CONTACT" },
            { data: "address", title: "ADDRESS" },
            { data: "country.country", title: "COUNTRY" },
            { title: "ACTION" },
          ],
          lengthChange: false,
          info: false,
          autoWidth: true,
          stateSave: true,
          fixedHeader: {
            header: false,
          },
          scrollX: true,
          language: {
            // Customization for text
            lengthMenu: "Show _MENU_ entries",
            infoFiltered: "(filtered from _MAX_ total entries)",
            search: "",
          },
          columnDefs: [
            {
              render: function (data, type, row) {
                return `<input type="checkbox" class="form-check" data-tableitemselect onchange="KTCustomMain.setSelectedRowInTable(event, 'agentTable', ${row.id})" />`;
              },
              targets: 0,
            },
            {
              width: "250px",
              target: 2,
            },

            {
              render: function (data, type, row) {
                return `<select data-id="${row.id}" data-full_name="${row.full_name}" class="alg-table-selector ms-2 badge rounded-1 fw-semibold" onchange="KTCustomMain.panelAction(event)">
                          <option class="px-1" value="defaultAction">Select</option>
                          <option class="px-1" value="agentEditModel">Edit</option>
                          <option class="px-1" value="agentViewModel">View</option>
                          <option class="px-1" value="agentDeleteModel">Delete</option>
                        </select>`;
              },
              targets: 8,
            },
          ],
        });
        app.tableSearchSwitch("panel8-table1");
        // app.tableFooterSwitch("panel1-table1", 0);
        app.activeTables.push({
          name: "agent_table",
          table: table,
        });
      }
      await tableInit();
      app.EM.subscribe("table_destroy", () => {
        app.activeTables.forEach((element) => {
          element.table.destroy();
        });
      });

      // date picker
      // Initialize the date range picker
      $(function () {
        // Initialize the date range picker
        $("#dateRangeInputAgent").daterangepicker(
          {
            opens: "center",
            autoUpdateInput: false,
          },
          function (start, end, label) {
            // Update the display button text with the selected date range
            $("#displayRangeButtonAgent").text(
              start.format("MMM D") + " - " + end.format("MMM D")
            );

            app.agentSearchDateRange =
              start.format("YYYY-MM-DD") + " - " + end.format("YYYY-MM-DD");
            tableInit(app);
          }
        );
      });

      this.imageSelector(1, this.agentImagesArrayNic, 2);
    },

    /**
     * open inventory delete modal
     *
     * @param {object} event  - browser event
     */
    agentDeleteModel(event) {
      this.openModel("#algModalPanel8Delete");

      const dataset = event.target.dataset;
      console.log(dataset.id);
      console.log(dataset.full_name);
      this.fillInputs("panel8DeleteInputGroup", {
        id: dataset.id,
        full_name: dataset.full_name,
      });

      this.defaultAction(event);
    },

    // agent agent
    deleteAgent() {
      const form = new FormData();
      form.append(
        "id",
        document.getElementById("panel8AgentDeleteModalId").value
      );

      this.fetchData(
        `${this.ROOT_URL}/api/agent/delete`,
        {
          method: "POST",
          body: form,
        },
        true
      );

      this.panelSwith("panel8");
    },

    async AgentAddModalUIUpdate() {
      // country selector
      this.updateSelectorWithServerData(
        "algModalPanel8AddCountry",
        "/api/country",
        0,
        "id",
        "country"
      );
    },

    // add agent data
    async addAgent() {
      const inputs = this.getInputValues("panel8AddInputGroup");

      const formData = this.createFormDataFromObject(inputs);
      formData.append(
        "agent_image",
        document.getElementById("algModalPanel8AddPicture").files[0]
      );

      // agent nic image
      const imageFilesAgents = await this.convertDataUrlsToFileObjects(
        this.agentImagesArrayNic
      );

      let agentIndexCount = 1;
      imageFilesAgents.forEach((element) => {
        formData.append("agent_id_image_" + agentIndexCount, element);
        agentIndexCount++;
      });

      fetch(`${this.ROOT_URL}/api/agent/add`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "success") {
            this.showToast("Success", true);

            document.getElementById("imagePreviewBox1").innerHTML = "";

            this.resetInputsToDefault(
              document.getElementById("panel8AddInputGroup")
            );

            this.agentImagesArrayNic = [];
            this.closeAllModals();
            this.panelSwith("panel8");
          } else if (data.status == "failed") {
            this.showToast(data.error);
          } else {
            console.log(data);
          }
        });
    },

    updateAgentSelectedAgentId: null,
    /**
     * open agent edit modal
     *
     * @param {object} event - browser event object
     */
    async agentEditModel(event) {
      this.openModel("#algModalPanel8Update");

      const data = await this.fetchData(
        `${this.ROOT_URL}/api/agent?id=${event.target.dataset.id}`
      );
      console.log();
      this.updateAgentSelectedAgentId = data.id;

      this.fillInputs("panel8UpdateInputGroup", data, false);
      await this.agentUpdateModalUIUpdate(data.country_id);

      document.getElementById("algModalPanel8UpdateCountry").value =
        data.country_id;

      document.getElementById("algModalPanel8UpdatePicture").value = null;
      document.getElementById("agentUpdateImagePreviewBox").innerHTML = "";

      this.defaultAction(event);
    },

    async agentUpdateModalUIUpdate(country_id) {
      // country selector
      this.updateSelectorWithServerData(
        "algModalPanel8UpdateCountry",
        "/api/country",
        country_id,
        "id",
        "country"
      );
    },

    // udpate air tickets
    updateAgent() {
      const inputs = this.getInputValues("panel8UpdateInputGroup");
      const id = this.updateAgentSelectedAgentId;
      console.log(inputs);

      const formData = this.createFormDataFromObject(inputs);
      formData.append("id", id);

      const updateAgentImage = document.getElementById(
        "algModalPanel8UpdatePicture"
      ).files[0];
      if (updateAgentImage) {
        formData.append("agent_image", updateAgentImage);
      }

      fetch(`${this.ROOT_URL}/api/agent/update`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "success") {
            this.showToast("Successfully Updated", true);

            this.closeAllModals();
            this.panelSwith("panel8");
          } else if (data.status == "failed") {
            this.showToast(data.error);
            console.log(data);
          } else {
            console.log(data);
          }
        });
    },

    /**
     * open the agent modal
     *
     * @param {object} event - browser events
     *
     */
    async agentViewModel(event) {
      this.openModel("#algModalPanel8View");

      const data = await this.fetchData(
        `${this.ROOT_URL}/api/agent?id=${event.target.dataset.id}`
      );

      this.fillInputs("panel8ViewInputGroup", data);

      document.getElementById(
        "agentUpdateImagePreviewBox"
      ).style.backgroundImage = `url('${this.ROOT_URL}/assets/images/agents/profile/${data.agent_image}')`;

      this.defaultAction(event);
    },

    //
    //
    //
    // ---------------------------------------------------------- panel 9
    //
    //
    //

    async panel9Init() {
      this.addCheckBoxes("permissionAddCheckBoxContainer");

      const app = this;
      app.activeTables = [];
      let table = null;
      async function tableInit() {
        // load data
        const data = await app.fetchData(`${app.ROOT_URL}/api/role`, {});

        // thigns to do on any data update
        document.getElementById("rolesTotalCountSpan").innerText = data.length;
        if (table) {
          table.rows().remove();
          table.rows.add(data).draw();
          return;
        }
        app.activeTables.forEach((element) => {
          if (element.name === "role_table") {
            return;
          }
        });
        table = new DataTable(".alg-panel9-table1", {
          data: data,
          columns: [
            { data: "role_name", title: "NAME" },
            { data: "role_description", title: "DESCRIPTION" },
            { title: "ACTION" },
          ],
          lengthChange: false,
          info: false,
          autoWidth: true,
          stateSave: true,
          fixedHeader: {
            header: true,
          },
          scrollX: true,
          language: {
            // Customization for text
            lengthMenu: "Show _MENU_ entries",
            infoFiltered: "(filtered from _MAX_ total entries)",
            search: "",
          },
          columnDefs: [
            {
              render: function (data, type, row) {
                return `<select data-id="${row.role_id}" data-role_name="${row.role_name}" class="alg-table-selector ms-2 badge rounded-1 fw-semibold" onchange="KTCustomMain.panelAction(event)">
                          <option class="px-1" value="defaultAction">Select</option>
                          <option class="px-1" value="roleUpdateModel">Edit</option>
                        </select>`;
              },
              targets: 2,
            },
          ],
        });
        app.tableSearchSwitch("panel9-table1");
        // app.tableFooterSwitch("panel1-table1", 0);
        app.activeTables.push({
          name: "role_table",
          table: table,
        });
      }
      await tableInit();
      app.EM.subscribe("table_destroy", () => {
        app.activeTables.forEach((element) => {
          element.table.destroy();
        });
      });
    },

    // update roles modal open
    updateRoleSelectedRoleId: null,
    async roleUpdateModel(event) {
      this.openModel("#algModalPanel9Update");

      const data = await this.fetchData(
        `${this.ROOT_URL}/api/role?id=${event.target.dataset.id}`
      );

      this.updateRoleSelectedRoleId = data[0].role_id;

      document.getElementById("algModalPanel9UpdateName").value =
        data[0].role_name;
      document.getElementById("algModalPanel9UpdateDescription").value =
        data[0].role_description;

      this.addCheckBoxes(
        "permissionUpdateCheckBoxContainer",
        true,
        this.updateRoleSelectedRoleId
      );

      this.defaultAction(event);
    },

    // add  role permission checkbox
    async addCheckBoxes(id, isUpdate = false, role_id = false) {
      const container = document.getElementById(id);
      container.innerHTML = "";

      const reguler = ["Create", "Read", "Update", "Delete"];
      const permissionsList = {
        "Select all": {
          column: "all",
          types: reguler,
        },
        Tours: {
          column: "tours",
          types: reguler,
        },
        Employees: {
          column: "employees",
          types: reguler,
        },
        Visas: {
          column: "visas",
          types: reguler,
        },
        Agents: {
          column: "agents",
          types: reguler,
        },
        Vechicles: {
          column: "vechicles",
          types: reguler,
        },
        Inventory: {
          column: "inventories",
          types: reguler,
        },
        Airlines: {
          column: "airs",
          types: reguler,
        },
        Hotels: {
          column: "hotels",
          types: reguler,
        },
        Customers: {
          column: "customers",
          types: reguler,
        },
        title: "Additional Permissions",
        "Export Reports": {
          column: "export",
          types: ["Enable"],
        },
      };

      // for updates
      let isChecked = " ";
      let currentPermissions = null;
      if (isUpdate && role_id) {
        currentPermissions = await this.fetchData(
          `${this.ROOT_URL}/api/role?id=${role_id}`
        );
        currentPermissions = currentPermissions[0].permission;
      }

      for (const key in permissionsList) {
        if (key === "title") {
          container.innerHTML += `<label class="fs-4 my-3">${permissionsList[key]}</label>`;
          continue;
        }

        let index = 1;
        let checkboxDesign = "";
        permissionsList[key].types.forEach((element) => {
          if (isUpdate) {
            isChecked =
              currentPermissions &&
              currentPermissions[permissionsList[key].column][index - 1] == "1"
                ? " checked "
                : "";
          }

          checkboxDesign += `<div class="d-flex gap-2 align-items-center">
                                     <input ${isChecked} data-permission="${permissionsList[key].column}" data-index="${index}" type="checkbox" class="alg-form-input" />
                                     <label>${element}</label>
                              </div>`;
          index++;
        });

        let selectAllCheckbox = "";

        if (key !== "Export Reports") {
          selectAllCheckbox += `<div class="d-flex gap-2 align-items-center ps-5">
                                     <input onchange="KTCustomMain.selectOtherCheckboxAll(event)" type="checkbox" class="alg-form-input" />
                                     <label class="d-none">Select All</label>
                              </div>`;
        }

        container.innerHTML += `
            <div class="d-flex py-4">
              <label class="col-2">${key}</label>
              <div class="col-10 d-flex justify-content-between gap-3">
                ${selectAllCheckbox}${checkboxDesign}
              </div>
            </div>
        `;
      }
    },

    selectOtherCheckboxAll(event) {
      const parent = event.target.parentElement.parentElement;
      const checkboxes = parent.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((element) => {
        if (element !== event.target) {
          if (!event.target.checked) {
            element.checked = false;
          } else {
            element.checked = true;
          }
        }
      });
    },

    addRoleData() {
      let updatedPermissions = {};

      const name = document.getElementById("algModalPanel9AddName").value;
      const description = document.getElementById(
        "algModalPanel9AddDescription"
      ).value;

      const container = document.getElementById(
        "permissionAddCheckBoxContainer"
      );

      container
        .querySelectorAll("input[data-permission]")
        .forEach((element) => {
          let input = element.dataset.permission;
          if (updatedPermissions[input] === undefined) {
            updatedPermissions[input] = "";
          }
          updatedPermissions[input] += element.checked ? "1" : "0";
        });

      // update the data
      const formData = this.createFormDataFromObject(updatedPermissions);
      formData.append("role_name", name);
      formData.append("role_description", description);

      console.log(updatedPermissions);

      fetch(`${this.ROOT_URL}/api/role/add`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "success") {
            this.showToast("Success", true);
            this.closeAllModals();
            this.panelSwith("panel9");
          } else if (data.status == "failed") {
            this.showToast(data.error);
          } else {
            console.log(data);
          }
        });
    },

    updateRoleData() {
      let updatedPermissions = {};

      const name = document.getElementById("algModalPanel9UpdateName").value;
      const description = document.getElementById(
        "algModalPanel9UpdateDescription"
      ).value;

      const container = document.getElementById(
        "permissionUpdateCheckBoxContainer"
      );

      container
        .querySelectorAll("input[data-permission]")
        .forEach((element) => {
          let input = element.dataset.permission;
          if (updatedPermissions[input] === undefined) {
            updatedPermissions[input] = "";
          }
          updatedPermissions[input] += element.checked ? "1" : "0";
        });

      // update the data
      const formData = this.createFormDataFromObject(updatedPermissions);
      formData.append("id", this.updateRoleSelectedRoleId);
      formData.append("role_name", name);
      formData.append("role_description", description);

      fetch(`${this.ROOT_URL}/api/role/update`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "success") {
            this.showToast("Success", true);
            this.closeAllModals();
            this.panelSwith("panel9");
          } else if (data.status == "failed") {
            this.showToast(data.error);
          } else {
            console.log(data);
          }
        });
    },

    //
    //
    //
    // ---------------------------------------------------------- panel 10
    //
    //
    //

    async panel10Init() {
      await fetch(`${this.ROOT_URL}/api/employee/userProfile`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "success") {
            const profileData = data.results;
            this.loadProfileUpdatePanelData(profileData);
          } else if (data.status == "failed") {
            this.showToast(data.error);
          } else {
            console.log(data);
          }
        });
    },

    loadProfileUpdatePanelData(profileData) {
      console.log(profileData);
      document.getElementById("profileName").innerText =
        profileData.first_name + profileData.last_name;
      document.getElementById("profileRole").innerText =
        profileData.role.role_name;
      document.getElementById("profileAddress").innerText = profileData.address;
      document.getElementById("profileEmail").innerText = profileData.email;
      document.getElementById("profileFullname").innerText =
        profileData.first_name + profileData.last_name;
      document.getElementById("profileEmail2").innerText = profileData.email;
      document.getElementById("loggedUserEmail").innerText = profileData.email;
      document.getElementById("profileLoggedUserEmailResetPassword").value =
        profileData.email;
      document.getElementById("profilePhoneNumber").innerText =
        profileData.phone;
      document.getElementById("profileCountry").innerText =
        profileData.country.country;

      document.getElementById("profileCommunication").innerText =
        profileData.communication;

      document.getElementById(
        "profileEditImagePreviewBox"
      ).src = `${this.ROOT_URL}/assets/images/employee/${profileData.employee_image}`;

      document.getElementById(
        "profileImagePreview"
      ).src = `${this.ROOT_URL}/assets/images/employee/${profileData.employee_image}`;

      if (profileData.communication === "Email") {
        document.getElementById("profileEditComm1").checked = true;
      }

      if (profileData.communication === "Phone") {
        document.getElementById("profileEditComm2").checked = true;
      }

      // country selector
      this.updateSelectorWithServerData(
        "profileEditCountrySelector",
        "/api/country",
        profileData.countries_id,
        "id",
        "country"
      );

      // role selector
      this.updateSelectorWithServerData(
        "profileEditRoleSelector",
        "/api/role",
        profileData.role_id,
        "role_id",
        "role_name"
      );

      KTCustomMain.fillInputs("editProfileInputGroup", profileData, false);

      document
        .getElementById("profileEditImageInput")
        .addEventListener("change", (element) => {
          this.updateImagePreview(
            "profileEditImageInput",
            "profileEditImagePreviewBox",
            (dataurl) => {
              this.updateProfileImageSelectedImage = dataurl;
            }
          );
        });
    },

    updateProfileImageSelectedImage: null,
    async updateProfile() {
      const form = this.createFormDataFromObject(
        this.getInputValues("editProfileInputGroup")
      );

      let imageFile = "";
      if (this.updateProfileImageSelectedImage) {
        imageFile = await this.convertDataUrlsToFileObjects([
          this.updateProfileImageSelectedImage,
        ]);
      }

      form.append("employee_image", imageFile);

      form.append("communication", "Email"); //  default value
      if (document.getElementById("profileEditComm2").checked) {
        console.log("mobile");
        form.append("communication", "Phone");
      }

      fetch(`${this.ROOT_URL}/api/employee/userProfileUpdate`, {
        method: "POST",
        body: form,
      }).then((data) => {
        this.handleResponse(data, () => {
          this.updateProfileImageSelectedImage = null;
          this.panelSwith("panel10");
        });
      });
    },

    updateProfileEmail() {
      const email = document.getElementById("profileNewEmail").value;
      const confirmEmail = document.getElementById(
        "profileNewEmailConfirm"
      ).value;

      if (email !== confirmEmail) {
        this.showToast("Emails are not Matching");
        return;
      }

      const formData = new FormData();
      formData.append("email", email);

      fetch(`${this.ROOT_URL}/api/employee/changeEmail`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == "success") {
            this.showToast("Email Changed Successfully", true);
            setTimeout(() => {
              window.location.href = "/";
            }, 1000);
          } else if (data.status == "failed") {
            this.showToast(data.error);
          } else {
            console.log(data);
          }
        });
    },

    changeProfileCommunicationCheck(event) {
      const check1 = document.getElementById("profileEditComm1");
      const check2 = document.getElementById("profileEditComm2");

      check1.checked = false;
      check2.checked = false;

      event.target.checked = true;
    },

    switchEditProfile() {
      document
        .querySelectorAll(".userProfileSettingsPanel")
        .forEach((element) => {
          element.classList.toggle("d-none");
          element.classList.toggle("d-block");
        });
    },

    resetPasswordToggle() {
      document
        .querySelectorAll(".resetPasswordTogglePanel")
        .forEach((element) => {
          element.classList.toggle("d-none");
          element.classList.toggle("d-block");
        });
    },

    async updatePassword() {
      const dataObject = this.getInputValues("passwordResetInputs");

      fetch(
        `${this.ROOT_URL}/reset-password?${this.objectToQueryParams(
          dataObject
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status == "success") {
            this.showToast("Password Changed Successfully", true);
            this.panelSwith("panel10");
          } else if (data.status == "failed") {
            this.showToast(data.error, true);
            alert(data.error);
          } else {
            console.log(data);
            alert("Something Went Wrong");
          }
        });
    },

    //
    //
    //
    // ---------------------------------------------------------- panel 11
    //
    //
    //

    vehicleImagesArrayVehicles: [],
    vehicleImagesArrayNic: [],
    vehicleImagesArrayLicanse: [],
    vehicleImagesArrayIns: [],

    vahicleManageDataRange: "2000-01-01 - 2099-12-31",
    vehicleTableSlectedRowData: [],
    async panel11Init() {
      const app = this;
      app.activeTables = [];

      let table = null;
      async function tableInit() {
        let dateRangeParam = "date_range=" + app.vahicleManageDataRange;

        // load data
        const data = await app.fetchData(
          `${app.ROOT_URL}/api/vechicle?${dateRangeParam}`,
          {}
        );
        console.log(data);

        // thigns to do on any data update
        document.getElementById("vehicleManageTotalCountSpan").innerText =
          data.length;
        if (table) {
          table.rows().remove();
          table.rows.add(data).draw();
          return;
        }
        app.activeTables.forEach((element) => {
          if (element.name === "vehicle_table") {
            return;
          }
        });
        table = new DataTable(".alg-panel11-table1", {
          data: data,
          columns: [
            { title: "SELECT" },
            { data: "date", title: "DATE" },
            { data: "vehicle_type", title: "VEHICLE TYPE" },
            { data: "vehicle_number", title: "V. NUMBER" },
            { data: "owner", title: "V. OWNER" },
            { data: "contact", title: "CONTACT" },
            { data: "agreement_no", title: "AGREEMENT NO" },
            { title: "ACTION" },
          ],
          lengthChange: false,
          info: false,
          autoWidth: true,
          stateSave: true,
          fixedHeader: {
            header: true,
          },
          scrollX: true,
          language: {
            // Customization for text
            lengthMenu: "Show _MENU_ entries",
            infoFiltered: "(filtered from _MAX_ total entries)",
            search: "",
          },
          columnDefs: [
            {
              render: function (data, type, row) {
                return `<input type="checkbox" class="form-check" data-tableitemselect onchange="KTCustomMain.setSelectedRowInTable(event, 'vehicleTable', ${row.id})" />`;
              },
              targets: 0,
            },
            {
              render: function (data, type, row) {
                return `<select data-id="${row.id}" data-vehicle_number="${row.vehicle_number}" class="alg-table-selector ms-2 badge rounded-1 fw-semibold" onchange="KTCustomMain.panelAction(event)">
                          <option class="px-1" value="defaultAction">Select</option>
                          <option class="px-1" value="vehicleViewModel">View</option>
                          <option class="px-1" value="vehicleUpdateModel">Edit</option>
                          <option class="px-1" value="vehicleDeleteModel">Delete</option>
                        </select>`;
              },
              targets: 7,
            },
          ],
        });
        app.tableSearchSwitch("panel11-table1");
        // app.tableFooterSwitch("panel1-table1", 0);
        app.activeTables.push({
          name: "vehicle_table",
          table: table,
        });
      }
      await tableInit();
      app.EM.subscribe("table_destroy", () => {
        app.activeTables.forEach((element) => {
          element.table.destroy();
        });
      });

      // date picker
      // Initialize the date range picker
      $(function () {
        // Initialize the date range picker
        $("#dateRangeInputVehicleManage").daterangepicker(
          {
            opens: "center",
            autoUpdateInput: false,
          },
          function (start, end, label) {
            // Update the display button text with the selected date range
            $("#displayRangeButtonVehicleManage").text(
              start.format("MMM D") + " - " + end.format("MMM D")
            );

            app.vahicleManageDataRange =
              start.format("YYYY-MM-DD") + " - " + end.format("YYYY-MM-DD");
            tableInit(app);
          }
        );
      });

      // load vehicle array
      this.setSelectorOptions(
        "algModalPanel11VehicleTypeAdd",
        this.vehicleTypes,
        0,
        "id",
        "value"
      );

      // image input listener
      this.imageSelector(1, this.vehicleImagesArrayVehicles, 5);
      this.imageSelector(2, this.vehicleImagesArrayNic, 2);
      this.imageSelector(3, this.vehicleImagesArrayLicanse, 2);
      this.imageSelector(4, this.vehicleImagesArrayIns, 2);

      // image input listener - update
      this.imageSelector(5, this.vehicleImagesArrayVehicles, 5);
      this.imageSelector(6, this.vehicleImagesArrayNic, 2);
      this.imageSelector(7, this.vehicleImagesArrayLicanse, 2);
      this.imageSelector(8, this.vehicleImagesArrayIns, 2);
    },

    vehicleDeleteModel(event) {
      this.openModel("#algModalPanel11Delete");

      const dataset = event.target.dataset;

      this.fillInputs("panel11DeleteInputGroup", {
        id: dataset.id,
        vehicle_number: dataset.vehicle_number,
      });

      this.defaultAction(event);
    },

    //  add vehicle
    async addVehicle() {
      const inputs = this.getInputValues("panel11AddInputGroup");
      const form = this.createFormDataFromObject(inputs);

      const imageFilesVehicles = await this.convertDataUrlsToFileObjects(
        this.vehicleImagesArrayVehicles
      );

      let vehiIndexCount = 1;
      imageFilesVehicles.forEach((element) => {
        form.append("vechicle_image_" + vehiIndexCount, element);
        vehiIndexCount++;
      });

      const imageFilesNic = await this.convertDataUrlsToFileObjects(
        this.vehicleImagesArrayNic
      );
      let nicIndexCount = 1;
      imageFilesNic.forEach((element) => {
        form.append("nic_image_" + nicIndexCount, element);
        nicIndexCount++;
      });

      const imageFilesIns = await this.convertDataUrlsToFileObjects(
        this.vehicleImagesArrayIns
      );
      let insIndexCount = 1;
      imageFilesIns.forEach((element) => {
        form.append("insurance_image_" + insIndexCount, element);
        insIndexCount++;
      });

      const imageFilesLic = await this.convertDataUrlsToFileObjects(
        this.vehicleImagesArrayLicanse
      );
      let licIndexCount = 1;
      imageFilesLic.forEach((element) => {
        form.append("licence_image_" + licIndexCount, element);
        licIndexCount++;
      });

      fetch(`${this.ROOT_URL}/api/vechicle/add`, {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "success") {
            this.showToast("Success", true);

            this.vehicleImagesArrayVehicles = [];
            this.vehicleImagesArrayNic = [];
            this.vehicleImagesArrayIns = [];
            this.vehicleImagesArrayLicanse = [];

            for (let x = 1; x <= 4; x++) {
              document.getElementById("imagePreviewBox" + x).innerHTML = "";
            }

            this.resetInputsToDefault(
              document.getElementById("panel11AddInputGroup")
            );

            this.closeAllModals();
            this.panelSwith("panel11");
          } else if (data.status == "failed") {
            this.showToast(data.error);
          } else {
            console.log(data);
          }
        });
    },

    // vehicle delete
    deleteVehicle() {
      const form = new FormData();
      form.append(
        "id",
        document.getElementById("panel11VehicleManageDeleteId").value
      );

      this.fetchData(
        `${this.ROOT_URL}/api/vechicle/delete`,
        {
          method: "POST",
          body: form,
        },
        true
      );

      this.panelSwith("panel11");
    },

    updateVehicleVehicleImagesTempArray: [],
    updateVehicleNicImagesTempArray: [],
    updateVehicleLicImagesTempArray: [],
    updateVehicleInsImagesTempArray: [],
    updateVehicleModelId: null,
    async vehicleUpdateModel(event) {
      this.clearTempArrays();
      this.clearTempDeleteImageArray();

      this.openModel("#algModalPanel11Update");
      this.updateVehicleModelId = event.target.dataset.id;

      const data = (
        await this.fetchData(
          `${this.ROOT_URL}/api/vechicle?id=${this.updateVehicleModelId}`
        )
      )[0];
      console.log(data);

      this.fillInputs("panel11UpdateInputGroup", data, false);
      this.clearImagePreviews([5, 6, 7, 8]);

      // load vehicle array
      this.setSelectorOptions(
        "algModalPanel11VehicleTypeUpdate",
        this.vehicleTypes,
        data.vehicle_type,
        "id",
        "value"
      );

      this.updateVehicleVehicleImagesTempArray = data.vechicle_images;
      this.updateImages(
        data.vechicle_images,
        5,
        "vechicle/image",
        "updateVehicleVehicleImagesTempArray"
      );

      this.updateVehicleNicImagesTempArray = data.owner_nic;
      this.updateImages(
        data.owner_nic,
        6,
        "vechicle/nic",
        "updateVehicleNicImagesTempArray"
      );

      this.updateVehicleLicImagesTempArray = data.vechicle_license;
      this.updateImages(
        data.vechicle_license,
        7,
        "vechicle/licence",
        "updateVehicleLicImagesTempArray"
      );

      this.updateVehicleInsImagesTempArray = data.vechicle_ins;
      this.updateImages(
        data.vechicle_ins,
        8,
        "vechicle/insurance",
        "updateVehicleInsImagesTempArray"
      );

      this.defaultAction(event);
    },

    clearTempArrays() {
      this.updateVehicleVehicleImagesTempArray = [];
      this.updateVehicleNicImagesTempArray = [];
      this.updateVehicleLicImagesTempArray = [];
      this.updateVehicleInsImagesTempArray = [];
    },

    clearTempDeleteImageArray() {
      this.delete_image_vechicle = [];
      this.delete_image_nic = [];
      this.delete_image_licence = [];
      this.delete_image_insurance = [];
    },

    clearImagePreviews(boxes) {
      boxes.forEach((box) => {
        document.getElementById(`imagePreviewBox${box}`).innerHTML = "";
      });
    },

    updateImages(images, boxId, path, tempArrayName) {
      if (!images) {
        return;
      }

      const container = document.getElementById(`imagePreviewBox${boxId}`);
      container.innerHTML = images.length ? "" : "No images to Show!";
      this[tempArrayName] = images;
      let noImage = false;
      images.forEach((element) => {
        if (element.image === "default.svg") {
          noImage = true;
          return;
        }

        container.innerHTML += `<div class="d-flex position-relative">
                                      <div class="alg-vehicles-image-preview rounded-1" style="background-image: url('${this.ROOT_URL}/assets/images/${path}/${element.image}');"></div>
                                      <i onclick="KTCustomMain.removeSelectedImageFromVehicleUpdate(${boxId}, ${element.id})" class="position-absolute bi bi-x-circle-fill"></i>
                                  </div>`;
      });
      if (noImage) {
        container.innerHTML += "No Image to Show...";
      }
    },

    delete_image_vechicle: [],
    delete_image_nic: [],
    delete_image_licence: [],
    delete_image_insurance: [],
    removeSelectedImageFromVehicleUpdate(type, id) {
      function removeById(array, id) {
        return array.filter((item) => item.id !== id);
      }

      let tempVehicles;
      let tempNic;
      let tempLic;
      let tempIns;
      switch (type) {
        case 5:
          tempVehicles = removeById(
            this.updateVehicleVehicleImagesTempArray,
            id
          );
          this.updateVehicleVehicleImagesTempArray = tempVehicles;
          this.delete_image_vechicle.push(id);
          break;

        case 6:
          tempNic = removeById(this.updateVehicleNicImagesTempArray, id);
          this.updateVehicleNicImagesTempArray = tempNic;
          this.delete_image_nic.push(id);
          break;

        case 7:
          tempLic = removeById(this.updateVehicleLicImagesTempArray, id);
          this.updateVehicleLicImagesTempArray = tempLic;
          this.delete_image_licence.push(id);
          break;

        case 8:
          tempIns = removeById(this.updateVehicleInsImagesTempArray, id);
          this.updateVehicleInsImagesTempArray = tempIns;
          this.delete_image_insurance.push(id);
          break;

        default:
          break;
      }

      this.clearImagePreviews([5, 6, 7, 8]);

      this.updateImages(
        this.updateVehicleVehicleImagesTempArray,
        5,
        "vechicle/image",
        "updateVehicleVehicleImagesTempArray"
      );
      this.updateImages(
        this.updateVehicleNicImagesTempArray,
        6,
        "vechicle/nic",
        "updateVehicleNicImagesTempArray"
      );
      this.updateImages(
        this.updateVehicleLicImagesTempArray,
        7,
        "vechicle/licence",
        "updateVehicleLicImagesTempArray"
      );
      this.updateImages(
        this.updateVehicleInsImagesTempArray,
        8,
        "vechicle/insurance",
        "updateVehicleInsImagesTempArray"
      );
    },

    updateVehicle() {
      const inputs = this.getInputValues("panel11UpdateInputGroup");
      inputs.delete_image_vechicle = this.delete_image_vechicle;
      inputs.delete_image_nic = this.delete_image_nic;
      inputs.delete_image_licence = this.delete_image_licence;
      inputs.delete_image_insurance = this.delete_image_insurance;

      const formData = this.createFormDataFromObject(inputs);
      formData.append("id", this.updateVehicleModelId);

      let updateVehicleIndex = 1;
      this.vehicleImagesArrayVehicles.forEach((element) => {
        formData.append(
          "vechicle_image_" + updateVehicleIndex,
          this.convertDataUrlsToFileObjects(element)
        );
        updateVehicleIndex++;
      });

      let updateNicIndex = 1;
      this.vehicleImagesArrayNic.forEach((element) => {
        formData.append(
          "nic_image_" + updateNicIndex,
          this.convertDataUrlsToFileObjects(element)
        );
        updateNicIndex++;
      });

      let updateLicIndex = 1;
      this.vehicleImagesArrayLicanse.forEach((element) => {
        formData.append(
          "licence_image_" + updateLicIndex,
          this.convertDataUrlsToFileObjects(element)
        );
        updateLicIndex++;
      });

      let updateInsindex = 1;
      this.vehicleImagesArrayIns.forEach((element) => {
        formData.append(
          "insurance_image_" + updateInsindex,
          this.convertDataUrlsToFileObjects(element)
        );
        updateInsindex++;
      });

      // return;

      console.log(inputs.delete_image_vechicle);
      console.log(inputs.delete_image_nic);
      console.log(inputs.delete_image_licence);
      console.log(inputs.delete_image_insurance);

      fetch(`${this.ROOT_URL}/api/vechicle/update`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "success") {
            this.showToast("Successfully Updated", true);
            this.clearImagePreviews([5, 6, 7, 8]);

            this.clearTempArrays();
            this.clearTempDeleteImageArray();
            this.closeAllModals();
            this.panelSwith("panel11");
          } else if (data.status == "failed") {
            this.showToast(data.error, false);
          } else {
            this.showToast("Something Went Wrong", false);
          }
        });
    },

    async vehicleViewModel(event) {
      this.openModel("#algModalPanel11View");

      for (let x = 1; x <= 4; x++) {
        document.getElementById("imagePreviewBox" + x).innerHTML = "";
      }

      const data = await this.fetchData(
        `${this.ROOT_URL}/api/vechicle?id=${event.target.dataset.id}`
      );

      console.log(data);

      if (!data || !data.length) {
        return;
      }

      const exactData = data[0];
      console.log(exactData);

      this.fillInputs("panel11ViewInputGroup", exactData);

      // vehicles iamges
      const vehicleImagesContainer = document.getElementById(
        "algModalPanel11VehicleImages"
      );
      vehicleImagesContainer.innerHTML = "";
      if (!exactData.vechicle_images.length) {
        vehicleImagesContainer.innerHTML = "No images to Show!";
      }
      exactData.vechicle_images.forEach((element) => {
        console.log(element.image);
        vehicleImagesContainer.innerHTML += `<div class="alg-vehicles-image-preview rounded-1" style="background-image: url('${this.ROOT_URL}/assets/images/vechicle/image/${element.image}');"></div>`;
      });

      // oweners images
      const ownersImage = document.getElementById(
        "algModalPanel11VehicleOwnerImages"
      );
      ownersImage.innerHTML = "";
      if (!exactData.owner_nic.length) {
        ownersImage.innerHTML = "No images to Show!";
      }
      exactData.owner_nic.forEach((element) => {
        console.log(element.image);
        ownersImage.innerHTML += `<div class="alg-vehicles-image-preview alg-vehicles-owner-image-preview rounded-1" style="background-image: url('${this.ROOT_URL}/assets/images/vechicle/nic/${element.image}');"></div>`;
      });

      // licance images
      const licanceImage = document.getElementById(
        "algModalPanel11VehicleLicanse"
      );
      licanceImage.innerHTML = "";
      if (!exactData.vechicle_license.length) {
        licanceImage.innerHTML = "No images to Show!";
      }
      exactData.vechicle_license.forEach((element) => {
        console.log(element.image);
        licanceImage.innerHTML += `<div class="alg-vehicles-image-preview alg-vehicles-owner-image-preview rounded-1" style="background-image: url('${this.ROOT_URL}/assets/images/vechicle/licence/${element.image}');"></div>`;
      });

      // insurance images
      const insImages = document.getElementById("algModalPanel11VehicleIns");
      insImages.innerHTML = "";
      if (!exactData.vechicle_ins.length) {
        insImages.innerHTML = "No images to Show!";
      }
      exactData.vechicle_ins.forEach((element) => {
        console.log(element.image);
        insImages.innerHTML += `<div class="alg-vehicles-image-preview alg-vehicles-owner-image-preview rounded-1" style="background-image: url('${this.ROOT_URL}/assets/images/vechicle/insurance/${element.image}');"></div>`;
      });

      this.defaultAction(event);
    },

    //
    //
    //
    // ---------------------------------------------------------- panel 0
    //
    //
    //

    async panel0Init() {
      this.addDashboardData();

      // deafults
      // set default currencty
      this.setSelectorOptions(
        "algModalPanel5AddCurrency",
        this.currencies,
        0,
        "id",
        "value"
      );
    },

    createMainChart(datapoints) {
      var ctx = document.getElementById("alg_air_ticket_inquery_chart");
      let labels = [];

      function generateLast12Days() {
        const today = new Date();
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        const result = [];
        for (let i = 30; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          const month = months[date.getMonth()];
          const day = date.getDate();
          result.push(`${month} ${day}`);
        }

        return result;
      }

      labels = generateLast12Days();

      const data = {
        labels: labels,
        datasets: [
          {
            display: false,
            data: datapoints,
            borderColor: "lightgreen",
            tension: 0.4,
          },
        ],
      };

      const config = {
        type: "line",
        data: data,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: false, // Add this line to hide the legends
            },
          },
          interaction: {
            intersect: false,
          },
          scales: {
            x: {
              display: true,
              title: {
                display: false,
              },
            },
            y: {
              display: true,
              title: {
                display: false,
              },
              suggestedMin: 0,
              suggestedMax:
                Math.max(...datapoints) + (Math.max(...datapoints) / 100) * 20,
            },
          },
        },
      };

      var myChart = new Chart(ctx, config);
    },

    createPieChart(dataSet) {
      var ctx = document.getElementById("alg_balance_chart");

      const data = {
        datasets: [
          {
            label: "Dataset 1",
            data: dataSet,
          },
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // Color for segment 1
          "rgba(54, 162, 235, 0.2)", // Color for segment 2
          "rgba(75, 192, 192, 0.2)", // Color for segment 3
        ],
        borderWidth: 1,
      };

      const config = {
        type: "doughnut",
        data: data,
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              enabled: false, // Enable tooltips (optional)
            },
            legend: {
              display: false,
            },
            title: {
              display: false,
            },
          },
        },
      };

      var myChart2 = new Chart(ctx, config);
    },

    async addDashboardData() {
      const getDashboardData = async (name) => {
        return await this.fetchData(`${this.ROOT_URL}/api/dashboard/${name}`);
      };

      // recent update
      const recentContainer = document.getElementById("recentVisitedPanels");
      recentContainer.innerHTML = "";
      this.getRecentPanels().forEach((element) => {
        recentContainer.innerHTML += `<a class="text-primary cursor-pointer" onclick="KTCustomMain.panelSwith('${
          element.panel ?? "panel0"
        }')">${element.title ?? ""}</a>
        <hr class="border-1 border-dashed border-black p-0 m-0 my-1" />
        `;
      });

      const countHotel = getDashboardData("count-hotel");
      const countVechicle = getDashboardData("count-vechicle");
      const countTour = getDashboardData("count-tour");
      const countAir = getDashboardData("count-air");
      const customerCount = getDashboardData("customer-count");
      const customerThisMonth = getDashboardData("customer-this-month");
      const approvedVisaCount = getDashboardData("approved-visa-count");
      const rejectVisaCount = getDashboardData("reject-visa-count");
      const cashDiagram = getDashboardData("cash-diagram");
      const airTicketDiagram = getDashboardData("airTicketDiagram");

      const mainPromise = new Promise((resolve, reject) => {
        Promise.all([
          cashDiagram, // 0
          countHotel, // 1
          countVechicle, // 2
          countTour, // 3
          countAir, // 4
          customerCount, // 5
          customerThisMonth, // 6
          approvedVisaCount, // 7
          rejectVisaCount, // 8
          airTicketDiagram, // 9
        ])
          .then((results) => {
            document.getElementById("dashboardCurrentBalance").innerText =
              results[0].total ?? "00";
            document.getElementById("dashboardIn").innerText =
              results[0].in ?? "00";
            document.getElementById("dashboardOut").innerText =
              results[0].out ?? "00";

            document.getElementById("dashboardTotal").innerText =
              results[0].total ?? "00";

            this.createPieChart([
              results[0].in,
              results[0].out,
              results[0].total,
            ]);

            document.getElementById("dashboardApproveVIsa").innerText =
              results[7] ?? "00";
            document.getElementById("dashboardRefusedVIsa").innerText =
              results[8] ?? "00";

            document.getElementById("dashboardNewCustomerCount").innerText =
              results[5] ?? "00";
            document.getElementById("dashboardCustomerCount").innerText =
              results[6] ?? "00";

            // dashboard cards
            document.getElementById("dashboardTotalHotelCount").innerText =
              results[1] ?? "00";
            document.getElementById("dashboardTotalVehicleCount").innerText =
              results[2] ?? "00";
            document.getElementById("dashboardTotalToursCount").innerText =
              results[3] ?? "00";
            document.getElementById(
              "dashboardTotalPurchasedAirTicketCount"
            ).innerText = results[4] ?? "00";

            this.createMainChart(results[9].airCount);
            document.getElementById("dashboardFullCount").innerText =
              results[9].airFullCount ?? "00";

            resolve("All background promises resolved successfully");
          })
          .catch((error) => {
            console.error("Error :", error);
            reject("One or more background promises failed");
          });
      });

      const recentAgent = await getDashboardData("recent-agent");
      const recentInventory = await getDashboardData("recent-inventory");
      console.log(recentInventory);

      // set defaults
      document.getElementById(
        "customerAddImagePreviewAddBox"
      ).style.backgroundImage = `url('${this.ROOT_URL}/assets/images/customer/default.svg')`;

      const app = this;
      app.activeTables = [];

      // table 1 - recent addded agents
      let table1 = null;
      async function table1Init() {
        // load data
        const data = recentAgent.agents;

        // thigns to do on any data update
        document.getElementById("dashboardTotalAgentCountSpan").innerText =
          recentAgent.totalAgent;

        if (table1) {
          table1.rows().remove();
          table1.rows.add(data).draw();
          return;
        }
        app.activeTables.forEach((element) => {
          if (element.name === "recent_agent_table") {
            return;
          }
        });
        table1 = new DataTable(".alg-panel0-table1", {
          data: data,
          columns: [
            { width: "250px", title: "Name" },
            { width: "60px", data: "id", title: "ID" },
            { width: "150px", data: "contact", title: "Contact" },
            { width: "170px", data: "country.country", title: "Country" },
          ],
          columnDefs: [
            {
              render: function (data, type, row) {
                console.log(row.agent_image);
                return `<div class="d-flex gap-3">
                              <img style="object-fit: contain; width: 50px; height: 50px; border-radius: 50px;" src="${KTCustomMain.ROOT_URL}/assets/images/agents/profile/${row.agent_image}" class="bg-secondary" />
                              <span>${row.full_name}</span>
                        </div>`;
              },
              width: "150px",
              targets: 0,
            },
          ],

          lengthChange: false,
          info: false,
          filter: false,
          ordering: false,
          paging: false,
          autoWidth: false,
          scrollX: true,
          language: {
            // Customization for text
            lengthMenu: "Show _MENU_ entries",
            infoFiltered: "(filtered from _MAX_ total entries)",
            search: "",
          },
        });
        // app.tableSearchSwitch("panel0-table1");
        // app.tableFooterSwitch("panel1-table1", 0);
        app.activeTables.push({
          name: "recent_agent_table",
          table: table1,
        });
      }
      await table1Init();

      // // table 2 - inventory
      let table2 = null;
      async function table2Init() {
        // load data
        const data = recentInventory.inventory;

        // thigns to do on any data update
        document.getElementById("dashboardTotalInventoryCountSpan").innerText =
          recentInventory.totalInventory;

        if (table2) {
          table2.rows().remove();
          table2.rows.add(data).draw();
          return;
        }
        app.activeTables.forEach((element) => {
          if (element.name === "recent_inventory_table") {
            return;
          }
        });
        table2 = new DataTable(".alg-panel0-table2", {
          data: data,
          columns: [
            { data: "product_name", title: "ITEM" },
            { data: "stock_no", title: "ITEM ID" },
            { data: "inventory_date", title: "DATE ADDED" },
            { title: "QTY" },
          ],
          lengthChange: false,
          info: false,
          search: false,
          filter: false,
          ordering: false,
          paging: false,
          autoWidth: true,
          fixedHeader: {
            header: true,
          },
          scrollX: true,
          language: {
            // Customization for text
            lengthMenu: "Show _MENU_ entries",
            infoFiltered: "(filtered from _MAX_ total entries)",
            search: "",
          },
          columnDefs: [
            {
              render: function (data, type, row) {
                return `<span>${row.qty_stock} PCS</span>`;
              },
              width: "20%",
              targets: 3,
            },
          ],
        });
        // app.tableSearchSwitch("panel0-table1");
        // app.tableFooterSwitch("panel1-table1", 0);
        app.activeTables.push({
          name: "recent_inventory_table",
          table: table2,
        });
      }
      await table2Init();

      // // table 3 - Customer
      let table3 = null;
      async function table3Init() {
        // load data
        const data = await app.fetchData(
          `${app.ROOT_URL}/api/customer?selected=true`,
          {}
        );
        console.log(data);

        // thigns to do on any data update
        document.getElementById("customerTotalCountSpan").innerText =
          data.length;

        if (table3) {
          table3.rows().remove();
          table3.rows.add(data).draw();
          return;
        }

        app.activeTables.forEach((element) => {
          if (element.name === "customer_table") {
            return;
          }
        });

        table3 = new DataTable(".alg-panel0-table3", {
          data: data,
          columns: [
            { title: "SELECT" },
            { data: "id", title: "ID" },
            { data: "registerd_date", title: "DATE" },
            { data: "full_name", title: "NAME" },
            { data: "email", title: "E-MAIL" },
            { data: "contact", title: "CONTACT" },
            { data: "address", title: "ADDRESS" },
            { data: "country", title: "COUNTRY" },
            { title: "ACTION" },
          ],

          lengthChange: false,
          info: false,
          autoWidth: true,
          stateSave: true,

          fixedHeader: {
            header: true,
          },
          scrollX: true,

          language: {
            // Customization for text
            lengthMenu: "Show _MENU_ entries",
            infoFiltered: "(filtered from _MAX_ total entries)",
            search: "",
          },

          columnDefs: [
            {
              render: function (data, type, row) {
                return `<input type="checkbox" class="form-check" data-tableitemselect onchange="KTCustomMain.setSelectedRowInTable(event, 'customerTable', ${row.id})" />`;
              },
              targets: 0,
            },
            {
              render: function (data, type, row) {
                return `<select data-id="${row.id}" data-full_name="${row.full_name}" class="alg-table-selector ms-2 badge rounded-1 fw-semibold" onchange="KTCustomMain.panelAction(event)">
                          <option class="px-1" value="defaultAction">Select</option>
                          <option class="px-1" value="customerEditModel">Edit</option>
                          <option class="px-1" value="customerViewModel">View</option>
                          <option class="px-1" value="customerDeleteModel">Delete</option>
                        </select>`;
              },
              targets: 8,
            },
          ],
        });
        app.tableSearchSwitch("panel0-table3");
        // app.tableFooterSwitch("panel1-table1", 0);

        app.activeTables.push({
          name: "customer_table",
          table: table3,
        });
      }
      await table3Init();

      // // table 4 - Visa
      let table4 = null;
      async function table4Init() {
        let dateRangeParam = "date_range=" + app.visaSearchDateRange;

        // load data
        const data = await app.fetchData(
          `${app.ROOT_URL}/api/visa?${dateRangeParam}`,
          {}
        );
        console.log(data);

        // thigns to do on any data update
        document.getElementById("visaTotalCountSpan").innerText = data.length;

        if (table4) {
          table4.rows().remove();
          table4.rows.add(data).draw();
          return;
        }

        app.activeTables.forEach((element) => {
          if (element.name === "visa_table") {
            return;
          }
        });

        table4 = new DataTable(".alg-panel0-table4", {
          data: data,
          columns: [
            { title: "SELECT" },
            { data: "id", title: "ID" },
            { data: "agent", title: "AGENT" },
            { data: "payment_status", title: "PAYMENT STATUS" },
            { data: "payment_type", title: "PAYMENT TYPE" },
            { data: "visa_category", title: "VISA CATEGORY" },
            { data: "approvel_status", title: "APPROVAL STATUS" },
            { data: "collect_status", title: "COLLECT STATUS" },
            { data: "total_cost", title: "COST" },
            { title: "ACTION" },
          ],

          lengthChange: false,
          info: false,
          autoWidth: true,
          stateSave: true,

          fixedHeader: {
            header: true,
          },
          scrollX: true,

          language: {
            // Customization for text
            lengthMenu: "Show _MENU_ entries",
            infoFiltered: "(filtered from _MAX_ total entries)",
            search: "",
          },

          columnDefs: [
            {
              render: function (data, type, row) {
                return `<input type="checkbox" class="form-check" data-tableitemselect onchange="KTCustomMain.setSelectedRowInTable(event, 'visaTable', ${row.id})" />`;
              },
              targets: 0,
            },
            {
              render: function (data, type, row) {
                return `<select data-id="${row.id}" data-visa_id="${row.visa_id}" class="alg-table-selector ms-2 badge rounded-1 fw-semibold" onchange="KTCustomMain.panelAction(event)">
                            <option class="px-1" value="defaultAction">Select</option>
                            <option class="px-1" value="visaEditModel">Edit</option>
                            <option class="px-1" value="visaViewModel">View</option>
                            <option class="px-1" value="visaDeleteModel">Delete</option>
                          </select>`;
              },
              targets: 9,
            },
          ],
        });
        app.tableSearchSwitch("panel0-table4");
        // app.tableFooterSwitch("panel1-table1", 0);

        app.activeTables.push({
          name: "visa_table",
          table: table4,
        });
      }
      await table4Init();

      app.EM.subscribe("table_destroy", () => {
        app.activeTables.forEach((element) => {
          element.table.destroy();
        });
      });

      // date picker
      // Initialize the date range picker
      $(function () {
        // Initialize the date range picker
        $("#dateRangeInputVisa").daterangepicker(
          {
            opens: "center",
            autoUpdateInput: false,
          },
          function (start, end, label) {
            // Update the display button text with the selected date range
            $("#displayRangeButtonVisa").text(
              start.format("MMM D") + " - " + end.format("MMM D")
            );

            app.visaSearchDateRange =
              start.format("YYYY-MM-DD") + " - " + end.format("YYYY-MM-DD");
            table4Init(app);
          }
        );
      });
    },

    //
    //
    //
    // ---------------------------------------------------------- panel 12
    //
    //
    //

    transactionManageBankDateRange: "2000-01-01 - 2099-12-31",
    transactionManageDrawerDateRange: "2000-01-01 - 2099-12-31",

    transactionImagesArrayBank: [],
    transactionImagesArrayDrawer: [],
    transactionTableSlectedRowData: [],
    transactionTable2SlectedRowData: [],
    async panel12Init() {
      const app = this;
      app.activeTables = [];

      let table1 = null;
      async function table1Init() {
        let dateRangeParam = "date_range=" + app.transactionManageBankDateRange;

        // load data
        const data = await app.fetchData(
          `${app.ROOT_URL}/api/drawer?${dateRangeParam}`,
          {}
        );

        // thigns to do on any data update
        document.getElementById("drawerTotalCountSpan").innerText = data.length;
        if (table1) {
          table1.rows().remove();
          table1.rows.add(data).draw();
          return;
        }
        app.activeTables.forEach((element) => {
          if (element.name === "drawer_table") {
            return;
          }
        });

        table1 = new DataTable(".alg-panel12-table1", {
          data: data,
          columns: [
            { title: "SELECT" },
            { data: "date", title: "DATE" },
            { data: "name", title: "TRANSACTION NAME" },
            { data: "amount", title: "AMOUNT" },
            { data: "type", title: "TYPE" },
            { data: "currency", title: "CURRENCY" },
            { data: "mode", title: "MODE" },
            { data: "balance", title: "BALANCE" },
            { title: "PROOF" },
            { title: "ACTION" },
          ],
          lengthChange: false,
          info: false,
          autoWidth: true,
          stateSave: true,
          fixedHeader: {
            header: true,
          },
          scrollX: true,
          language: {
            // Customization for text
            lengthMenu: "Show _MENU_ entries",
            infoFiltered: "(filtered from _MAX_ total entries)",
            search: "",
          },
          columnDefs: [
            {
              render: function (data, type, row) {
                return `<input type="checkbox" class="form-check" data-tableitemselect onchange="KTCustomMain.setSelectedRowInTable(event, 'transactionTable', ${row.id})" />`;
              },
              targets: 0,
            },
            {
              render: function (data, type, row) {
                return `<span onclick="KTCustomMain.transactionImageModel('${row.image}', 'Drawer')" class="btn-info text-white btn btn-sm px-3 py-1"><i class="bi text-white bi-eye"></i> VIEW</span>`;
              },
              targets: 8,
            },
            {
              render: function (data, type, row) {
                return `<select data-id="${row.id}" data-name="${row.name}" data-type="drawer" class="alg-table-selector ms-2 badge rounded-1 fw-semibold" onchange="KTCustomMain.panelAction(event)">
                          <option class="px-1" value="defaultAction">Select</option>
                          <option class="px-1" value="transactionViewModel">View</option>
                          
                          <option class="px-1" value="transactionDeleteModel">Delete</option>
                        </select>`; // <option class="px-1" value="transactionUpdateModel">Edit</option>
              },
              targets: 9,
            },
          ],
        });
        app.tableSearchSwitch("panel12-table1");
        // app.tableFooterSwitch("panel1-table1", 0);
        app.activeTables.push({
          name: "drawer_table",
          table: table1,
        });
      }
      await table1Init();

      let table2 = null;
      async function table2Init() {
        let dateRangeParam =
          "date_range=" + app.transactionManageDrawerDateRange;

        // load data
        const data = await app.fetchData(
          `${app.ROOT_URL}/api/bank?${dateRangeParam}`,
          {}
        );

        // thigns to do on any data update
        document.getElementById("bankTotalCountSpan").innerText = data.length;
        if (table2) {
          table2.rows().remove();
          table2.rows.add(data).draw();
          return;
        }
        app.activeTables.forEach((element) => {
          if (element.name === "bank_table") {
            return;
          }
        });

        table2 = new DataTable(".alg-panel12-table2", {
          data: data,
          columns: [
            { title: "SELECT" },
            { data: "date", title: "DATE" },
            { data: "name", title: "TRANSACTION NAME" },
            { data: "amount", title: "AMOUNT" },
            { data: "type", title: "TYPE" },
            { data: "currency", title: "CURRENCY" },
            { data: "mode", title: "MODE" },
            { data: "balance", title: "BALANCE" },
            { title: "PROOF" },
            { title: "ACTION" },
          ],
          lengthChange: false,
          info: false,
          autoWidth: true,
          stateSave: true,
          fixedHeader: {
            header: true,
          },
          scrollX: true,
          language: {
            // Customization for text
            lengthMenu: "Show _MENU_ entries",
            infoFiltered: "(filtered from _MAX_ total entries)",
            search: "",
          },
          columnDefs: [
            {
              render: function (data, type, row) {
                return `<input type="checkbox" class="form-check" data-tableitemselect onchange="KTCustomMain.setSelectedRowInTable(event, 'transactionTable2', ${row.id})" />`;
              },
              targets: 0,
            },
            {
              render: function (data, type, row) {
                console.log(row);
                return `<span  onclick="KTCustomMain.transactionImageModel('${row.image}', 'bank')"  class="btn-info text-white btn btn-sm px-3 py-1"><i class="bi text-white bi-eye"></i> VIEW</span>`;
              },
              targets: 8,
            },
            {
              render: function (data, type, row) {
                return `<select data-id="${row.id}" data-name="${row.name}" data-type="bank" class="alg-table-selector ms-2 badge rounded-1 fw-semibold" onchange="KTCustomMain.panelAction(event)">
                          <option class="px-1" value="defaultAction">Select</option>
                          <option class="px-1" value="transactionViewModel">View</option>
                          
                          <option class="px-1" value="transactionDeleteModel">Delete</option>
                        </select>`; // <option class="px-1" value="transactionUpdateModel">Edit</option>
              },
              targets: 9,
            },
          ],
        });
        app.tableSearchSwitch("panel12-table2");
        // app.tableFooterSwitch("panel1-table1", 0);
        app.activeTables.push({
          name: "bank_table",
          table: table2,
        });
      }
      await table2Init();

      this.imageSelector("1", this.transactionImagesArrayDrawer, 1);
      this.imageSelector("2", this.transactionImagesArrayBank, 1);

      // udpate other
      this.updateBalanceFields("drawer", "transactionDrawerCurrentBalanceSpan");
      this.updateBalanceFields("bank", "transactionBankCurrentBalanceSpan");

      app.EM.subscribe("table_destroy", () => {
        app.activeTables.forEach((element) => {
          element.table.destroy();
        });
      });

      // date picker
      // Initialize the date range picker
      $(function () {
        // Initialize the date range picker
        $("#dateRangeInputTransactionManageDrawer").daterangepicker(
          {
            opens: "center",
            autoUpdateInput: false,
          },
          function (start, end, label) {
            // Update the display button text with the selected date range
            $("#displayRangeButtonTransactionManageDrawer").text(
              start.format("MMM D") + " - " + end.format("MMM D")
            );

            app.transactionManageDrawerDateRange =
              start.format("YYYY-MM-DD") + " - " + end.format("YYYY-MM-DD");
            table1Init(app);
          }
        );
      });

      // date picker
      // Initialize the date range picker
      $(function () {
        // Initialize the date range picker
        $("#dateRangeInputTransactionManageBank").daterangepicker(
          {
            opens: "center",
            autoUpdateInput: false,
          },
          function (start, end, label) {
            // Update the display button text with the selected date range
            $("#displayRangeButtonTransactionManageBank").text(
              start.format("MMM D") + " - " + end.format("MMM D")
            );

            app.transactionManageBankDateRange =
              start.format("YYYY-MM-DD") + " - " + end.format("YYYY-MM-DD");
            table2Init(app);
          }
        );
      });
    },

    updateBalanceFields(panel, id) {
      fetch(`${this.ROOT_URL}/api/open/${panel}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "success") {
            document.getElementById(id).value = data.results;
          } else {
            console.log("Somethign Went Wrong");
          }
        });
    },

    addOpenningBalance(panel, id) {
      const value = document.getElementById(id).value;
      const form = this.createFormDataFromObject({
        [panel]: value,
      });

      fetch(`${this.ROOT_URL}/api/open/add`, {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "success") {
            this.showToast("success", true);
            document.getElementById(id).value = "";
            this.updateBalanceFields(
              "drawer",
              "transactionDrawerCurrentBalanceSpan"
            );
            this.updateBalanceFields(
              "bank",
              "transactionBankCurrentBalanceSpan"
            );
            this.closeAllModals();
            this.panelSwith("panel12");
          } else {
            this.showToast(data.error);
            console.log("Somethign Went Wrong");
          }
        });
    },

    transactionImageModel(image, type) {
      console.log(image);

      this.openModel("#algModalPanel12Image");
      const iamageContainer = document.getElementById(
        "algModalPanel12ImagePreview"
      );

      if (image) {
        iamageContainer.style.backgroundImage = `url('${this.ROOT_URL}/assets/images/${type}/${image}')`;
      } else {
        iamageContainer.innerHTML = "No proof to show";
      }
    },

    currentTransactionModal: null,
    updateTypeOfTransaction(modal) {
      this.currentTransactionModal = modal;

      const transactionCashAddModalName = document.getElementById(
        "transactionCashAddModalName"
      );
      if (modal === "bank") {
        transactionCashAddModalName.innerText = " Bank ";
      } else if (modal === "drawer") {
        transactionCashAddModalName.innerText = " Drawer ";
      }

      // set default currencty
      this.setSelectorOptions(
        "algModalPanel12AddCurrencyDrawer",
        this.currencies,
        0,
        "id",
        "value"
      );
    },

    transactionImagesArrayDrawer: [],
    transactionImagesArrayBank: [],
    async addTransaction() {
      if (!this.currentTransactionModal) {
        return;
      }

      const inputs = this.getInputValues("panel12AddInputGroup");
      const FormData = this.createFormDataFromObject(inputs);

      const imageFile = await this.convertDataUrlsToFileObjects(
        this.transactionImagesArrayDrawer
      );
      FormData.append("image", imageFile[0]);

      fetch(`${this.ROOT_URL}/api/${this.currentTransactionModal}/add`, {
        method: "POST",
        body: FormData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "success") {
            this.showToast("success", true);
            this.transactionImagesArrayBank = [];
            this.transactionImagesArrayDrawer = [];
            this.resetInputsToDefault(
              document.getElementById("panel12AddInputGroup")
            );
            this.transactionImagesArrayBank = [];
            this.transactionImagesArrayDrawer = [];
            this.closeAllModals();
            this.panelSwith("panel12");
          } else if (data.status == "failed") {
            this.showToast(data.error);
          } else {
            console.log(data);
          }
        });
    },

    // delete
    deleteSelectedTransactionType: null,
    transactionDeleteModel(event) {
      this.openModel("#algModalPanel12Delete");

      this.deleteSelectedTransactionType = event.target.dataset.type;

      this.fillInputs("panel12DeleteInputGroup", {
        id: event.target.dataset.id,
        name: event.target.dataset.name,
      });

      this.defaultAction(event);
    },

    deleteTransaction() {
      const form = this.createFormDataFromObject(
        this.getInputValues("panel12DeleteInputGroup")
      );

      fetch(
        `${this.ROOT_URL}/api/${this.deleteSelectedTransactionType}/delete`,
        {
          method: "POST",
          body: form,
        }
      ).then((res) => {
        this.handleResponse(res, () => {
          this.panelSwith("panel12");
        });
      });
    },

    async transactionViewModel(event) {
      console.log(event.target.dataset.id);
      const data = await this.fetchData(
        `${this.ROOT_URL}/api/${event.target.dataset.type}?id=${event.target.dataset.id}`
      );

      this.openModel("#algModalPanel12View");
      this.fillInputs("panel12ViewInputGroup", data);

      const imageType =
        event.target.dataset.type == "drawer" ? "Drawer" : "bank";

      const imageUrl = `${this.ROOT_URL}/assets/images/${imageType}/${data.proof}`;
      console.log(imageUrl);

      document.getElementById(
        "algModalPanel12ImagePreviewView"
      ).style.backgroundImage = `url('${imageUrl}')`;

      this.defaultAction(event);
    },

    async handleResponse(res, successCallback = () => {}) {
      if (!res.ok) {
        console.log("Something Went Wrong! Code : 1030");
        return false;
      }

      let data = null;
      try {
        data = await res.json();
      } catch (error) {
        return false;
      }

      if (data.status == "success") {
        this.showToast("success", true);
        successCallback();
      } else if (data.status == "failed") {
        this.showToast(data.error);
        console.log(data.error);
      } else {
        console.log(data);
      }
    },
  };
})();

// Webpack support
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = KTCustomMain;
}
