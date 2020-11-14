import React, { useState, DragEvent } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import { connector, PropsFromRedux } from './container'

import styles from './Main.module.scss'
import { settings } from 'config'

const Main = (props: PropsFromRedux) => {
  // const { sendFiles } = props
  const [drag, setDrag] = useState(false)
  const [upload, setUpload] = useState(false)

  const sendForm = async (form: FormData) => {
    const result = await axios
      .post(`${settings.api}/upload`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        params: 'file',
      })
      .then((data) => console.log(data))
  }

  const dragStartHandler = (e: DragEvent) => {
    e.preventDefault()
    setDrag(true)
  }

  const dragLeaveHandler = (e: DragEvent) => {
    e.preventDefault()
    setDrag(false)
  }

  const onDropHandler = (e: DragEvent) => {
    e.preventDefault()
    setUpload(true)
    const files = [...e.dataTransfer.files]
    const form = new FormData()

    form.append('file', files[0])

    sendForm(form)
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Перетащите вашу базу адресов сюда</p>
      <div className={styles.content}>
        <div>
          {upload ? (
            <div className={styles.upload}>24%</div>
          ) : (
            <div
              className={drag ? classnames(styles.upload, styles.uploadActive) : styles.upload}
              onDragStart={(e) => dragStartHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragOver={(e) => dragStartHandler(e)}
              onDrop={(e) => onDropHandler(e)}
            >
              <svg width='90' height='84' viewBox='0 0 90 84' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M24.3792 36.2103C23.73 35.5611 23.3653 34.6806 23.3653 33.7625C23.3653 32.8445 23.73 31.964 24.3792 31.3148C25.0284 30.6656 25.9088 30.3009 26.8269 30.3009C27.745 30.3009 28.6255 30.6656 29.2747 31.3148L41.5385 43.5786V3.46154C41.5385 2.54348 41.9032 1.66302 42.5523 1.01386C43.2015 0.364696 44.0819 0 45 0C45.9181 0 46.7985 0.364696 47.4477 1.01386C48.0968 1.66302 48.4615 2.54348 48.4615 3.46154V43.5786L60.7253 31.3148C61.0468 30.9934 61.4284 30.7384 61.8484 30.5644C62.2684 30.3905 62.7185 30.3009 63.1731 30.3009C63.6277 30.3009 64.0778 30.3905 64.4978 30.5644C64.9178 30.7384 65.2994 30.9934 65.6208 31.3148C65.9423 31.6363 66.1972 32.0179 66.3712 32.4378C66.5452 32.8578 66.6347 33.308 66.6347 33.7625C66.6347 34.2171 66.5452 34.6673 66.3712 35.0873C66.1972 35.5072 65.9423 35.8888 65.6208 36.2103L47.4477 54.3834C47.1263 54.7048 46.7447 54.9598 46.3247 55.1338C45.9047 55.3077 45.4546 55.3973 45 55.3973C44.5454 55.3973 44.0953 55.3077 43.6753 55.1338C43.2553 54.9598 42.8737 54.7048 42.5523 54.3834L24.3792 36.2103ZM86.5385 41.551C85.6204 41.551 84.7399 41.9157 84.0908 42.5649C83.4416 43.214 83.0769 44.0945 83.0769 45.0125V76.1664H6.92308V45.0125C6.92308 44.0945 6.55838 43.214 5.90922 42.5649C5.26005 41.9157 4.3796 41.551 3.46154 41.551C2.54348 41.551 1.66303 41.9157 1.01386 42.5649C0.364697 43.214 0 44.0945 0 45.0125V76.1664C0.00206144 78.0019 0.732117 79.7616 2.03 81.0595C3.32788 82.3574 5.0876 83.0874 6.92308 83.0895H83.0769C84.9124 83.0874 86.6721 82.3574 87.97 81.0595C89.2679 79.7616 89.9979 78.0019 90 76.1664V45.0125C90 44.0945 89.6353 43.214 88.9861 42.5649C88.337 41.9157 87.4565 41.551 86.5385 41.551Z'
                  fill='#0055A6'
                />
              </svg>
            </div>
          )}
        </div>
        <div className={styles.uploadText}>
          или
          <form action='#' method='POST' className={styles.formUpload} id='formUpload' encType='multipart/form-data'>
            <label className={styles.uploadLabel}>
              <span>загрузите файл со своего компьютера *</span>
              <input
                type='file'
                onChange={(e) => {
                  const files = e.target.files

                  if (files && files.length) {
                    const form = new FormData()
                    form.set('file', files[0])
                    sendForm(form)
                  }
                }}
              />
            </label>
          </form>
        </div>
        <p className={styles.prompt}>* Вы можете загружать только файлы в xlsx и csv форматах </p>
      </div>
    </div>
  )
}

export default connector(Main)
