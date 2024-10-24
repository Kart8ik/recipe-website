
const apiRequest = async (url='',options=null,errMsg=null) => {
    try{
        const response = await fetch(url,options)
        if (!response.ok) throw Error('reload the page')
    } catch(err){
        errMsg=err
    } finally {
        return errMsg
    }
}

export default apiRequest
