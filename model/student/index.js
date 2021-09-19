/**
 * @module model/student
 * @file This file has the schema for Student
 * @author vishnu
 */

/** dependencies */
import logger from 'services/log';
import * as Sequelize from 'sequelize';
import config from 'config';
import dbService from 'services/database';
import commonConstant from 'constant/commonconstant';

const Op = Sequelize.Op;

class studentModel {

    defineSchema() {
        this.Student = dbService.sequelize.define(commonConstant.STUDENT_TABLE_NAME, {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            age: {
                type: Sequelize.SMALLINT,
                allowNull: false
            },
            mark1: {
                type: Sequelize.SMALLINT,
                allowNull: false
            },
            mark2: {
                type: Sequelize.SMALLINT,
                allowNull: false
            },
            mark3: {
                type: Sequelize.SMALLINT,
                allowNull: false
            },
        }, {});

        this.Student.sync({ force: config.FORCE_SCHEMA_DROP }).then(result => {
            logger.info("studentModel::defineSchema -> SyncDone");
        })
        .catch(err => {
            logger.error('studentModel::defineSchema', err);
        });
    }

    getWhereCondition(filterOptions) {
        let whereCondition = {};
        if(filterOptions['resultStatus'] === 'passed') {
            whereCondition = {
                [Op.and]: [
                    {
                        mark1: {
                            [Op.gte]: commonConstant.PASS_MARK
                        }
                    },
                    {
                        mark2: {
                            [Op.gte]: commonConstant.PASS_MARK
                        }
                    },
                    {
                        mark3: {
                            [Op.gte]: commonConstant.PASS_MARK
                        }
                    }
                ]
            }
        } else if (filterOptions['resultStatus'] === 'failed') {
            whereCondition = {
                [Op.or]: [
                    {
                        mark1: {
                            [Op.lt]: commonConstant.PASS_MARK
                        }
                    },
                    {
                        mark2: {
                            [Op.lt]: commonConstant.PASS_MARK
                        }
                    },
                    {
                        mark3: {
                            [Op.lt]: commonConstant.PASS_MARK
                        }
                    }
                ]
            }
        }
        return whereCondition;
    }

    getConnectionVar() {
        return this.Student;
    }
}

export default new studentModel();
