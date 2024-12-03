import xmldata from '../data/res.xml?raw'
import { HttpResponse } from 'msw'

export const mockXml = () => {
  return new HttpResponse(xmldata, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml', // 添加正确的 Content-Type
    }
  })
}
