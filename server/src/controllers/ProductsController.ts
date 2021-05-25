import { Request, Response } from 'express'
import ProductsService from '../services/ProductsService'

class ProductsController {
  async index(req: Request, res: Response) {
    const productsService = new ProductsService()

    const data = await productsService.getProducts(req.query)

    res.json(data)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params

    const productsService = new ProductsService()

    const product = await productsService.getProductById(id)

    res.json(product)
  }

  async create(req: Request, res: Response) {
    const productsService = new ProductsService()

    await productsService.createProduct(req.body)

    res.status(201).send()
  }

  async update(req: Request, res: Response) {
    const { id } = req.params

    const productsService = new ProductsService()

    await productsService.updateProduct(id, req.body)

    res.send()
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const productsService = new ProductsService()

    await productsService.deleteProduct(id)

    res.send()
  }
}

export default ProductsController
