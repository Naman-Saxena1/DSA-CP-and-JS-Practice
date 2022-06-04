const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach( tab=>{
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        
        //Removing active class from all tabs
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active')
        })

        
        tabs.forEach(tab => {
            tab.classList.remove('active')
        })

        tab.classList.add('active')
        //Setting active class only to our Current Tab (Target)
        target.classList.add('active')
    })
})
