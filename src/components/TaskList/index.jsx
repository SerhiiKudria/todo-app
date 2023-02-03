import React from 'react'
import { connect } from 'react-redux'
import { deleteTask, updateTask } from '../../store/slices/taskSlice'
import { FaTrash } from 'react-icons/fa'
import styles from './TaskList.module.sass'

export const TaskList = ({ tasks, remove, update }) => {
  const handleTaskChange = (id, isDone) => update(id, { isDone: !isDone })

  return (
    <div className={styles.taskList}>
      {tasks.map(c => (
        <div className={styles.taskRow} key={c.id}>
          <input
            type='checkbox'
            checked={c.isDone}
            onChange={() => handleTaskChange(c.id, c.isDone)}
          />
          <label className={c.expired ? styles.expired : ''}>
            {c.name} {c.deadline}
          </label>

          <button onClick={() => remove(c.id)}>
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = taskList => taskList

const mapDispatchToProps = dispatch => ({
  remove: id => dispatch(deleteTask(id)),
  update: (id, updatedData) => dispatch(updateTask({ id, updatedData }))
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
