import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const LessonOrganizer = ({ modules, onModulesChange }) => {
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceModuleIndex = parseInt(source.droppableId);
    const destModuleIndex = parseInt(destination.droppableId);
    const sourceIndex = source.index;
    const destIndex = destination.index;

    const newModules = [...modules];
    const [movedLesson] = newModules[sourceModuleIndex].lessons.splice(sourceIndex, 1);
    newModules[destModuleIndex].lessons.splice(destIndex, 0, movedLesson);

    onModulesChange(newModules);
  };

  const handleLessonClick = (lessonId) => {
    setSelectedLesson(selectedLesson === lessonId ? null : lessonId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="lesson-organizer">
        {modules.map((module, moduleIndex) => (
          <div key={module.id} className="module-container">
            <h3>{module.title}</h3>
            <Droppable droppableId={moduleIndex.toString()}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="lessons-container"
                >
                  {module.lessons.map((lesson, index) => (
                    <Draggable
                      key={lesson.id}
                      draggableId={lesson.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`lesson-item ${selectedLesson === lesson.id ? 'selected' : ''}`}
                          onClick={() => handleLessonClick(lesson.id)}
                        >
                          <div className="lesson-content">
                            <h4>{lesson.title}</h4>
                            {lesson.videoUrl && (
                              <div className="video-preview">
                                <iframe
                                  src={lesson.videoUrl}
                                  title={lesson.videoTitle}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                                <p className="video-title">{lesson.videoTitle}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default LessonOrganizer; 