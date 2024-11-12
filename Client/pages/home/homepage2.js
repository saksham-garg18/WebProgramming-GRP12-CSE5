
const testimonialsData = {
  testimonials: [
    {
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi adipisci hic pariatur vitae, temporibus et magnam, atque saepe dignissimos architecto iusto tempore, cumque deleniti rem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi adipisci hic pariatur vitae.",
      name: "Adnan Hussain",
      position: "Boss",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTToPUxWqXxLg6d1Kpj2QNQjtfMxTzsxhC8dg&s",
    },
    {
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi adipisci hic pariatur vitae, temporibus et magnam, atque saepe dignissimos architecto iusto tempore, cumque deleniti rem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi adipisci hic pariatur vitae.",
      name: "Sarah Khan",
      position: "Manager",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg",
    },
    {
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi adipisci hic pariatur vitae, temporibus et magnam, atque saepe dignissimos architecto iusto tempore, cumque deleniti rem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi adipisci hic pariatur vitae.",
      name: "John Doe",
      position: "Developer",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg",
    },
  ],
};

function renderTestimonials() {
  const container = document.getElementById("testimonialContainer");

  testimonialsData.testimonials.forEach((testimonial) => {
    const testimonialCard = document.createElement("div");
    testimonialCard.classList.add("test-card");

    testimonialCard.innerHTML = `
              <div class='quote-i'>
                  <img src="../../assets/quote-icon.png" alt="" />
              </div>
              <div class='testi-text'>
                  <p>${testimonial.quote}</p>
              </div>
              <div class='testi-person'>
                  <div class="testi-person-img">
                      <img src="${testimonial.image}" alt="" />
                  </div>
                  <div class="testi-person-info">
                      <h6>${testimonial.name}</h6>
                      <p>${testimonial.position}</p>
                  </div>
              </div>
          `;

    container.appendChild(testimonialCard);
  });
}
window.onload = renderTestimonials;

  const imageData = {
      "imageStack": [
          "https://plus.unsplash.com/premium_photo-1675894811591-fb43bf4c41a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5leHVzfGVufDB8fDB8fHww",
          "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxlY3RyaWMlMjBndWl0YXJ8ZW58MHx8MHx8fDA%3D",
          "https://images.unsplash.com/photo-1579267217516-b73084bd79a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ymx1ZXxlbnwwfHwwfHx8MA%3D%3D"
      ],
      "horizonImages": [
          "https://plus.unsplash.com/premium_photo-1663954130790-e85da8e5539c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2t8ZW58MHx8MHx8fDA%3D",
          "https://plus.unsplash.com/premium_photo-1661956197580-008967ad1500?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmFsbGV5fGVufDB8fDB8fHww",
          "https://plus.unsplash.com/premium_photo-1701094772103-c60b22a69ccc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXVyYXxlbnwwfHwwfHx8MA%3D%3D",
          "https://images.unsplash.com/photo-1500674425229-f692875b0ab7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlnaHRuaW5nfGVufDB8fDB8fHww"
      ]
  };

  function loadImageStack() {
      const imgStackContainer = document.getElementById('home-img-stack-con');
      imageData.imageStack.forEach((image, index) => {
          const imgStackItem = document.createElement('div');
          imgStackItem.classList.add('img-stacks-cards');
          imgStackItem.style.backgroundImage = `url(${image})`;
          imgStackItem.style.top = `${(index + 1) * 3}rem`;
          imgStackContainer.appendChild(imgStackItem);
      });
  }

  function loadHorizonImages() {
      const horizonCardsContainer = document.getElementById('horizon-cards');
      imageData.horizonImages.forEach((image) => {
          const horizonCard = document.createElement('div');
          horizonCard.classList.add('horizon-card');
          horizonCard.innerHTML = `<img src="${image}" alt="Horizon Image" />`;
          horizonCardsContainer.appendChild(horizonCard);
      });
  }

  document.addEventListener("DOMContentLoaded", () => {
      loadImageStack();
      loadHorizonImages();
  });

  document.addEventListener("DOMContentLoaded", () => {
      const testcards = document.querySelectorAll(".test-card");

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    e.currentTarget.style.setProperty("--x", `${x}px`);
    e.currentTarget.style.setProperty("--y", `${y}px`);
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.setProperty("--x", `-100px`);
    e.currentTarget.style.setProperty("--y", `-100px`);
  };

  testcards.forEach((testcard) => {
    testcard.addEventListener("mousemove", handleMouseMove);
    testcard.addEventListener("mouseleave", handleMouseLeave);
  });

  window.addEventListener("beforeunload", () => {
    testcards.forEach((testcard) => {
      testcard.removeEventListener("mousemove", handleMouseMove);
      testcard.removeEventListener("mouseleave", handleMouseLeave);
    });
  });
});