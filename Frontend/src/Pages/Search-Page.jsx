import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Product from '../Product/Product';



function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
    // You can trigger API call or filter logic here
  };

  return (
    <div className='min-h-screen w-full bg-[#151515] text-white relative overflow-hidden'>
      <Navbar/>

      {/* Search Bar */}
      <div className="w-full flex justify-center mt-6 px-4 fixed top-[35%] z-[9999]">
        <form 
          onSubmit={handleSubmit} 
          className="w-full max-w-xl flex items-center gap-3"
        >
          <input
            type="text"
            placeholder="Search for products, categories and more..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Two-way binding
            className="w-full px-4 py-2 rounded-md bg-[#222] border border-gray-600 outline-none focus:border-gray-300"
          />
          <button 
            type="submit" 
            className="px-4 py-2 bg-[#5da7f7] hover:bg-blue-700 rounded-md"
          >
            Search
          </button>
        </form>
      </div>

      <div className="background relative h-screen w-full overflow-hidden ">
        <div className="images flex">
            
            <img src="./search.jpg" className=' h-screen object-contain' alt="" />
            <img src="./search1.jpg" className=' w-[35%] object-contain' alt="" />
            <img src="https://images.unsplash.com/photo-1737514996816-a034a795febe?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" className=' h-screen object-contain' alt="" />
            
        </div>
      </div>
      <div className="result absolute z-[9999] top-[50%]   flex w-full justify-center gap-4">
      
<div className="bg-black rounded-xl">
<Product
  name="Luxury Bridal Saree"
  description="Handcrafted premium silk saree with zari border, perfect for weddings."
  price="2499"
  image="./l1.jpg"
  tags={["New", "Wedding", "Silk"]}
/>
</div>


<div className="bg-black rounded-xl">
<Product
  name="Luxury Bridal Saree"
  description="Handcrafted premium silk saree with zari border, perfect for weddings."
  price="2499"
  image="./l1.jpg"
  tags={["New", "Wedding", "Silk"]}
/>
</div>
<div className="bg-black rounded-xl">
<Product
  name="Luxury Bridal Saree"
  description="Handcrafted premium silk saree with zari border, perfect for weddings."
  price="2499"
  image="./l1.jpg"
  tags={["New", "Wedding", "Silk"]}
/>
</div>
      </div>
    </div>
  )
}

export default SearchPage
