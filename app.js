/* GETS ALL DROPLETS FROM ALL PAGES */
const dropletDispatcher = {
    page: 'https://api.digitalocean.com/v2/droplets?page=1&per_page=200', //First Page
    droplets: [],
    execute: function () {
        const self = this;
        return new Promise((resolve, reject)=> {
            //Gets/accumulates droplets per page and returns next page until no pages are left
            getDropletsPerPage(self.page,WRITE_CONFIG).then( (response)=> {
                self.page = response['nextPage'];
                self.droplets.push(response['droplets']);

                if (self.page === undefined)
                    resolve(true);/* done */
                else {
                    self.execute().then(()=> {
                        resolve(true);
                    });
                }
            }).catch((error)=>{
                reject(error)
            })
        });
    }
}
