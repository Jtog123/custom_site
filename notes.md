tailwind build command
-----------------

npx tailwindcss -i ./tailwind.css -o ./output.css --watch



------------
styling code

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tailwind Site</title>
  <link href="output.css" rel="stylesheet">
</head>
<body>
  <div class="display flex flex-col bg-gray-200 h-screen mb-40 items-center justify-center">

    <div class="intro-container  ">
      <h1 id="type-el-1" class="w-full m-10 justify-center text-2xl font-mono font-bold"></h1>
      

    <div  class="links-container w-full m-10 flex gap-8 mb-32 justify-center ">

      <div class="cursor-pointer px-6 py-3 rounded-xl bg-gray-100 shadow-[inset_0_-4px_0_#c1c1c1] border border-gray-300 text-black font-mono font-bold text-lg hover:translate-y-[2px] hover:shadow-[inset_0_-2px_0_#c1c1c1] transition duration-150">
      GitHub
      </div>

      
      <div class="cursor-pointer px-6 py-3 rounded-xl bg-pink-100 shadow-[inset_0_-4px_0_#e87eb5] border border-pink-300 text-pink-800 font-mono font-bold text-lg hover:translate-y-[2px] hover:shadow-[inset_0_-2px_0_#e87eb5] transition duration-150">
      Instagram
      </div>

    </div>

  </div>

  <script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      new Typed('#type-el-1', {
        strings: [
          `Hi, I'm <span class="text-pink-800">James.^1000 </span><br/> I spend most of my time programming about technology and business. <br/>There are other things I enjoy too, but this page focuses on the work and ideas I care about most.`
        ],
        typeSpeed: 45,
        showCursor:false
      });
      
    })
  </script>
  
</body>
